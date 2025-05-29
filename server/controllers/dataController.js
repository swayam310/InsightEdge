const FinancialData = require('../models/FinancialData');
const { parseCSV, parseExcel, parseJSON } = require('../utils/fileParser');

// Upload financial data file
exports.uploadFileData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const fileType = req.file.originalname.split('.').pop().toLowerCase();
    let parsedData;
    
    // Parse file based on type
    switch (fileType) {
      case 'csv':
        parsedData = await parseCSV(req.file.buffer);
        break;
      case 'xlsx':
      case 'xls':
        parsedData = parseExcel(req.file.buffer);
        break;
      case 'json':
        parsedData = JSON.parse(req.file.buffer.toString());
        break;
      default:
        return res.status(400).json({ message: 'Unsupported file type' });
    }
    
    // Transform and save data
    const savedData = [];
    for (const item of parsedData) {
      const financialData = new FinancialData({
        userId: req.user._id,
        date: new Date(item.date),
        product: item.product,
        quantity: Number(item.quantity),
        price: Number(item.price),
        total: Number(item.quantity) * Number(item.price),
        category: item.category || 'Other',
        fileType,
        filename: req.file.originalname
      });
      
      const saved = await financialData.save();
      savedData.push(saved);
    }
    
    res.status(201).json({
      userId: req.user._id,
      filename: req.file.originalname,
      fileType,
      count: savedData.length,
      message: 'Data uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save manually entered data
exports.saveManualData = async (req, res) => {
  try {
    const { data } = req.body;
    
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: 'Invalid data format' });
    }
    
    const savedData = [];
    for (const item of data) {
      const financialData = new FinancialData({
        userId: req.user._id,
        date: new Date(item.date),
        product: item.product,
        quantity: Number(item.quantity),
        price: Number(item.price),
        total: Number(item.total),
        category: item.category || 'Other',
        fileType: 'manual',
        filename: 'Manual Entry'
      });
      
      const saved = await financialData.save();
      savedData.push(saved);
    }
    
    res.status(201).json({
      count: savedData.length,
      message: 'Data saved successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all financial data for a user
exports.getUserData = async (req, res) => {
  try {
    const financialData = await FinancialData.find({ userId: req.user._id }).sort({ date: -1 });
    
    res.json(financialData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get summary statistics for dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get total revenue
    const totalRevenueResult = await FinancialData.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;
    
    // Get total sales count
    const totalSales = await FinancialData.countDocuments({ userId });
    
    // Get average order value
    const avgOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;
    
    // Get revenue by category
    const categoryData = await FinancialData.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: '$category', value: { $sum: '$total' } } },
      { $project: { name: '$_id', value: 1, _id: 0 } }
    ]);
    
    // Get monthly revenue for the current year
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = await FinancialData.aggregate([
      { 
        $match: { 
          userId: userId,
          date: { 
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$date' },
          value: { $sum: '$total' }
        }
      },
      {
        $project: {
          month: '$_id',
          value: 1,
          _id: 0
        }
      },
      { $sort: { month: 1 } }
    ]);
    
    // Format monthly data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map((name, index) => {
      const monthData = monthlyRevenue.find(m => m.month === index + 1);
      return { name, value: monthData ? monthData.value : 0 };
    });
    
    // Get recent transactions
    const recentTransactions = await FinancialData.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('_id date product total createdAt')
      .lean();
    
    const formattedTransactions = recentTransactions.map(t => ({
      id: t._id,
      date: new Date(t.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      customer: t.product,
      amount: t.total,
      status: 'completed'
    }));
    
    res.json({
      totalRevenue,
      totalSales,
      avgOrderValue,
      categoryData,
      revenueData: {
        monthly: monthlyData,
        // Add quarterly and yearly data calculation here if needed
        quarterly: [], 
        yearly: []
      },
      recentTransactions: formattedTransactions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
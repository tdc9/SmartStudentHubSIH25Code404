const cron = require('node-cron');
const Achievement = require('../models/achievement.model');


// daily reminder to approvers for pending achievements
cron.schedule('0 9 * * *', async ()=>{
try{
const pending = await Achievement.countDocuments({ status: 'pending' });
console.log('Pending achievements', pending);
// create batch notifications
}catch(err){ console.error(err); }
});


module.exports = cron;
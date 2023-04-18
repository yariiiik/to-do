const {Router} = require('express');
const router = Router()

// console.log('todos.js  __dirname=====> ', __dirname);

router.use(function timeLog(req, res, next) {
  d=new Date(Date.now());
  console.log('Time: ', d.toISOString());
  next();
});

router.all('/', async function (req, res, next) {
	console.log('\n 0)all(/)_req.params=', req.params,'_req.query=', req.query);
  next(); // pass control to the next handler
});

router.put('/', async (req,res)=>{
	console.log('_req.query=', req.query);
	const collection = req.app.locals.collection;
	let user = await collection.findOne({ tg_id: +req.query.id });
	let check=req.query.checked.split(',');
	const reqObj={lastUpdate:'$$NOW'};
	check.forEach(item=>{
		user.todo[+item].checked ? reqObj["todo."+item+".checked"]=0 : reqObj["todo."+item+".checked"]=1
	});
	console.log('_reqObj_===', reqObj);
	await collection.updateOne({tg_id: +req.query.id }, {$set:reqObj} );
	
// let mongomess={$set:{[check]:0,lastUpdate: '$$NOW'}};
// const editcheck = '[{ $set:{lastUpdate: "$$NOW"}},{ $set:{todo.['+check+'].checked:1}}]';
	// console.log('\n check=', check,' mongomess=',mongomess );
	// let user = await collection.updateOne({tg_id:666},[{ $set:{lastUpdate: "$$NOW"}},{ $set:{editcheck:1}}]);

	// let user = await collection.updateMany({tg_id:666},mongomess);
	// console.log('\n user=', user);
	// res.render('index',{title:'My to-do',isIndex:true,user})
	// res.render('index',{title:'My to-do',isIndex:true})
	res.redirect('/?id='+req.query.id)
})

router.get('/', async (req,res)=>{
	const collection = req.app.locals.collection;
	const reqObj={ tg_id : +req.query.id };
	let user = await collection.findOne(reqObj);
	// console.log('_req_.query===', req.query,'user=',user,'reqObj=',reqObj);
	// console.log('\n user=', user,'\n user.todo=', user.todo);
	// console.log('\n user===========ok','\n user.todo[0].checked=', user.todo);
	res.render('index',{title:'My to-do',isIndex:true,user})
})




router.get('/create', async (req,res)=>{
	res.render('create',{title:'Create to-do',isCreate:true})
})

module.exports = router

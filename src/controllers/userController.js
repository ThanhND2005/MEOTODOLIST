const User = require('../models/user');
const Task = require('../models/task');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const getWeather = async ()=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?q=hà nội&appid=c34d0b30de706ed953190741dcd852f2&units=metric&lang=vi";
    const respone = await fetch(url);
    const weather = await respone.json();
    return weather;
}
const getLoginPage = (req,res)=>{
    const errorMessage = req.flash('error');
    res.status(200).render('pages/login',{
        error : errorMessage}
    );  
}
const getRegisterPage = (req,res)=>{
    const error = req.flash('error');
    res.status(200).render('pages/register',{
        error : error,
    });
}
const getHome = async (req,res) =>{
    if(req.session.user){
        user = req.session.user;
        tasks = await Task.find({username:user.username, delete:'false'}).lean();
        weather = await getWeather();
        res.status(200).render('pages/home',{
            user : user,
            tasks : tasks,
            weather : weather,
        });
    }
    else {
        res.status(301).redirect('/login');
    }
}
const checkUser = async (req,res)=>{
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username:username}).lean();
        if(user && bcrypt.compare(password,user.password))
        {
            req.session.user = user;
            res.status(200).redirect('/');
        }
        else{
            req.flash('error','Thông tin đăng nhập hoặc mật khẩu không chính xác !');
            res.status(301).redirect('/login');
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
const creatUser = async (req,res)=>{
    const {name, username, password,city} = req.body;
    const hashPassword = await bcrypt.hash(password,saltRounds);
    try {
        const user = await User.create({
            name : name,
            username : username,
            avatar :"https://i.pinimg.com/736x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg",
            password : hashPassword,
            city : city
        })
        res.status(200).redirect('/login');
    } catch (error) {
        req.flash('error','tên đăng nhập đã tồn tại!');
        res.status(500).redirect('/register');
    }
}
const getUpdatePage = (req,res)=>{
    res.status(200).render('pages/update');
}
const updateAvatar = async (req,res) =>{
    if(req.file)
    {
        avatarUrl = req.file.path;
    }
    try {
        const user = await User.findOneAndUpdate({username: req.session.user.username},{avatar:avatarUrl});
        req.session.destroy();
        res.status(200).redirect('/')
    } catch (error) {
        console.log('cap nhap that bai');
        res.status(500).send('loi cap nhap anh');
    }
}
const Logout = (req,res) =>{
    req.session.destroy();
    res.status(200).redirect('/login');
}

module.exports = {
    getLoginPage : getLoginPage,
    getHome : getHome,
    getRegisterPage : getRegisterPage,
    checkUser : checkUser,
    creatUser : creatUser,
    updateAvatar :updateAvatar,
    Logout :Logout,
    getUpdatePage : getUpdatePage
}
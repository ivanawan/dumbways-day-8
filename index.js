const express = require('express');
const { redirect } = require('express/lib/response');
// const { render } = require('express/lib/response');

const app = express();
const PORT = 80;
app.set('view engine','hbs');
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];

let listProject=[{
  title: 'hahahha',
  author: 'ivan setiawan',
  date: '25 May 2022 - 30 June 2022',
  checkbox: [
    'ri-reactjs-line ri-xl',
    'ri-android-line ri-xl',
    'ri-gatsby-line ri-xl'
  ],
  duration: '1 bulan',
  content: 'hgjhgjhgjhgjgh'
}];

app.get('/', (req, res) => {
  console.log(listProject);
  res.render('index',{listProject});
})

app.get('/project/add', (req, res) => {
  res.render('project');
})

app.post('/project/add',(req,res)=>{
  const data = req.body;
  listProject.push({
    title: data["name"],
    author:"ivan setiawan",
    date: getFullTime(data["date-start"],data["date-end"]),
    checkbox:data["checkbox[]"],
    duration: difference(data["date-start"],data["date-end"]) ,
    content:data["content"]
  });
  res.redirect('/');
})

app.get('/project/delete/:id',(req,res)=>{
  listProject.splice(req.params.id,1);
  res.redirect('/');
})

app.get('/project/edit/:id',(req,res)=>{
  res.render('project',{edit:listProject[req.params.id],id:req.params.id});
})

app.post('/project/update/:id',(req,res)=>{
const data = req.body;
listProject[req.params.id]={  
        title: data["name"],
        author:"ivan setiawan",
        date: getFullTime(data["date-start"],data["date-end"]),
        checkbox:data["checkbox[]"],
        duration: difference(data["date-start"],data["date-end"]) ,
        content:data["content"]
      };
 res.redirect('/');     
});

app.get('/project/:id',(req,res)=>{
  res.render('project-detail',{project:listProject[req.params.id]});
})


app.get('/contact', (req, res) => {
  res.render('contact');
})

app.get('/project/detail', (req, res) => {
  res.render('project-detail');
})
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });



function difference(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    day = 1000*60*60*24;
    dif =(date2utc - date1utc)/day;
  return dif < 30 ? dif +" hari" : parseInt(dif/30)+" bulan"
}

function getFullTime(dateStart,dateEnd){
  dateStart= new Date(dateStart);
  dateEnd = new Date(dateEnd);
  return `${dateStart.getDate()} ${month[dateStart.getMonth()]} ${dateStart.getFullYear()} - ${dateEnd.getDate()} ${month[dateEnd.getMonth()]} ${dateEnd.getFullYear()}`;
}


const express= require('express');
const Axios = require("axios");
sortJsonArray = require('sort-json-array');
const app=express();
app.use(express.json());




const somefunction = async () => {

  const array_people = [];
  const array_planets = [];

  const client = Axios.create();

for (let i = 1; i < 87; i++) {

    var url1=`https://swapi.dev/api/people/${i}`;
    var url2=`https://swapi.dev/api/planets/${i}`;

    if(i<84){

  try {
    const resp = await client.get(url1);
    data1=resp.data;
    data1.height=parseInt(data1.height);
    data1.mass=parseInt(data1.mass);
    if (data1.height <100){
        data1.height="0"+data1.height;
    }
    if (data1.mass <100){
        data1.mass="0"+data1.mass;
    }
    array_people.push(data1);


    }
     catch(e) {
        console.log("No data");
        }
    }

    if(i<61){
    try {
        const resp = await client.get(url2);
        data1=resp.data;
        array_planets.push(data1);
    
        }
    catch(e) {
        console.log("No data");
        }
    }
  }

  for (let j = 0; j <array_planets.length; j++) {

    residents=array_planets[j].residents;

    for (let i = 0; i <residents.length; i++) {

    try{
     resident=residents[i];
     resident=resident.slice(0, -1);

     let poz1 = resident.lastIndexOf("/");
     prompoz=resident.slice(poz1+1);

     const promname1=array_people[prompoz-1];
     promname2=promname1.name;
     array_planets[j].residents[i]=promname2;
    }


    catch(e) {
        console.log("No data");
        }

}

 }

  console.log("Data available");

    //people

  app.get('/api/people',(req,res)=>{

        const sorted = array_people.slice(); 

        //checking query
        if(req.query.sortBy){


            var query_param=req.query.sortBy;

            if(query_param === "name"){
                sortJsonArray(sorted, 'name','asc');
            }
            if(query_param === "height"){
                sortJsonArray(sorted, 'height','asc');             
            }
            if(query_param === "mass"){
                sortJsonArray(sorted, 'mass','asc');
            }

            for (let i = 0; i <sorted.length; i++) {

                sorted[i].height=""+sorted[i].height;
                sorted[i].mass=""+sorted[i].mass;
            }

            res.send(sorted);

        }
        else{
        res.send(array_people);

        }


    });

    app.get('/api/people/:id',(req,res)=>{
       const person=array_people[parseInt(req.params.id)];
       if(!person) return res.status(404).send('Not found');
       res.send(person);

    });



    //planets

  app.get('/api/planets',(req,res)=>{
       res.send(array_planets);
    });

  app.get('/api/planets/:id',(req,res)=>{
       const planet=array_planets[parseInt(req.params.id)];
       if(!planet) return res.status(404).send('Not found');
       res.send(planet);





    
    });


};


somefunction();





const port=process.env.port || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));































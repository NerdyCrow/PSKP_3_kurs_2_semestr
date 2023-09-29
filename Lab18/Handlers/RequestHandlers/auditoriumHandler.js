const dbConnection = require('../../DB');
const {Auditorium} = require('../../Models/model').ORM(dbConnection);
const errorHandler = require('../../Handlers/RequestHandlers/errorHandler');
const Sequelize = require('sequelize');

function addAuditorium(request, reponse, body) 
{
    Auditorium.create(
    {
        auditorium: body.auditorium,
        auditorium_name: body.auditorium_name,
        auditorium_capacity: body.auditorium_capacity,
        auditorium_type: body.auditorium_type
    }).then((result) => 
        {
            reponse.end(JSON.stringify(result));
        })
    .catch((error) => errorHandler(reponse, 500, error.message));
}

function updateAuditorium(request, reponse, body) 
{
    Auditorium.update({auditorium_name: body.auditorium_name}, {where: {auditorium: body.auditorium}}).then((result) => 
    {
        if (result == 0) 
        {
            throw new  Error("Auditorium not found!")
        } 
        else 
        {
            reponse.end(JSON.stringify(body))
        }
        })
        .catch((error) => errorHandler(reponse, 500, error.message));
}

module.exports = async function(request,response)
{
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

    switch(request.method)
    {
        case "GET":
        {
            const path = request.url;      

            if (/api\/auditoriumscope/.test(path)) 
            {
                let auditoriums = Auditorium.scope('auditoriumscope').findAll();
                auditoriums
                    .then(result => {
                        response.end(JSON.stringify(result));
                    })
                    .catch(err => errorHandler(response, 500, err.message));
            } 
            else if (/api\/auditoriumstransaction/.test(path)) 
            {
                
                const t = await dbConnection.transaction();
                Auditorium.update(
                  { auditorium_capacity: 0 },
                  {
                    where: {
                    },
                    transaction: t,
                  }
                ).then(()=>{      
                  Auditorium.findAll({transaction: t,}).then((auditoriums) => {
                  response.writeHead(200, { "Content-Type": "application/json" });
                  response.end(JSON.stringify(auditoriums));
               
                })} ).catch((err)=>{
                });
          
          
                setTimeout(async () => {
                  await t.rollback();
                }, 10000);
            } 
            else 
            {
                Auditorium.findAll().then((result) => 
                {
                    response.end(JSON.stringify(result));
                })
                .catch(error => errorHandler(response, 500, error.message)); 
            }
            break;
        }
        case "POST":
        {
            let body = "";

            request.on("data",data =>
            {
                body += data.toString();
            });

            request.on("end",() =>
            {
                addAuditorium(request,response,JSON.parse(body));
            });

            break;

        }
        case "PUT":
        {
            let body = "";

            request.on("data",data =>
            {
                body += data.toString();
            });

            request.on("end",() =>
            {
                updateAuditorium(request,response,JSON.parse(body));
            });

            break;
        }
        case "DELETE":
        {
            Auditorium.findByPk(request.url.split('/')[3])
            .then((result) => {
                Auditorium.destroy({where: {auditorium: request.url.split('/')[3]}}).then((resultD) => 
                {
                    if (resultD == 0) 
                    {
                        throw new Error('Auditorium not found')
                    } 
                    else 
                    {
                        response.end(JSON.stringify(result))
                    }
                    }).catch(error => errorHandler(response, 500, error.message));
            })
            .catch(error => errorHandler(response, 500, error.message)); 
           break;
        }
    }
}
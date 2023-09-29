const dbConnection = require('../../DB');
const {Teacher} = require('../../Models/model').ORM(dbConnection);
const errorHandler = require('../../Handlers/RequestHandlers/errorHandler');
const Sequelize = require('sequelize');

function addTeacher(request, reponse, body) 
{
    Teacher.create(
    {
        teacher: body.teacher,
        teacher_name: body.teacher_name,
        pulpit: body.pulpit
    }).then((result) => 
        {
            reponse.end(JSON.stringify(result));
        })
    .catch((error) => errorHandler(reponse, 500, error.message));
}

function updateTeacher(request, reponse, body) 
{
    Teacher.update({teacher_name: body.teacher_name}, {where: {teacher: body.teacher}}).then((result) => 
    {
        if (result == 0) 
        {
            throw new  Error("Teacher not found!")
        } 
        else 
        {
            reponse.end(JSON.stringify(body))
        }
        })
        .catch((error) => errorHandler(reponse, 500, error.message));
}

module.exports = function(request,response)
{
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

    switch(request.method)
    {
        case "GET":
        {
            const path = request.url;      

            if (/api\/teachersgt60/.test(path)) 
            {
                let teachers = Teacher.scope('teachersgt60').findAll();
                teachers
                    .then(result => {
                        response.end(JSON.stringify(result));
                    })
                    .catch(err => errorHandler(response, 500, err.message));
            }
            else 
            {
                Teacher.findAll().then((result) => 
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
                addTeacher(request,response,JSON.parse(body));
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
                updateTeacher(request,response,JSON.parse(body));
            });

            break;
        }
        case "DELETE":
        {
            Teacher.findByPk(request.url.split('/')[3])
            .then((result) => {
                console.log(request.url.split('/')[3]);
                Teacher.destroy({where: {teacher: decodeURI(request.url.split('/')[3])}}).then((resultD) => 
                {
                    if (resultD == 0) 
                    {
                        throw new Error('Teacher not found')
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
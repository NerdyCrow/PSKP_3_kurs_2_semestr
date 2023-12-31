const dbConnection = require('../../DB');
const errorHandler = require('../RequestHandlers/errorHandler');
const {Faculty} = require('../../Models/model').ORM(dbConnection);
const {Pulpit} = require('../../Models/model').ORM(dbConnection);
const {Teacher} = require('../../Models/model').ORM(dbConnection);
const {Subject} = require('../../Models/model').ORM(dbConnection);

function addFaculty(request, response, body) 
{
    Faculty.create(
        {
        faculty: body.faculty,
        faculty_name: body.faculty_name
    }).then(result => 
        {
            response.end(JSON.stringify(result));
        }).catch(error => errorHandler(response, 500, error.message));
}

function updateFaculty(request, response, body) 
{
    Faculty.update({faculty_name: body.faculty_name}, {where: {faculty: body.faculty}})
        .then(result => 
        {
        if (result == 0) 
        {
            throw new Error("Faculty not found")
        } 
        else 
        {
            response.end(JSON.stringify(body))
        }
        }).catch(error => errorHandler(response, 500, error.message));
}


module.exports = function (request, response) {
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

    switch (request.method) {
        case "GET": 
        {
            const path = request.url;      
           if (/\/api\/faculties\/.*\/subjects/.test(path)) 
            {
                Faculty.hasMany(Pulpit, {foreignKey: 'faculty'});
                Pulpit.hasMany(Subject, {foreignKey: 'pulpit'})
                Faculty.findAll({
                    include: [
                    {
                    model: Pulpit, required: true,
                    include: [{model: Subject, required: true}]
                    }
                    ],
                    where: {
                    faculty: decodeURI(request.url.split('/')[3])
                    }
                    }).then(result => {   
                    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    response.end(JSON.stringify(result));
                }).catch(err => {errorHandler(response, 500, err.message);console.log(err);});
                }
            else
            {  
            Faculty.findAll()
                .then(result => 
                {
                    response.end(JSON.stringify(result));
                }).catch(error => errorHandler(response, 500, error.message));
            }
            break;
        }
           
        case "POST": 
        {
            let body = "";

            request.on("data", data => 
            {
                body += data.toString();
            });

            request.on("end", () => 
            {
                addFaculty(request, response, JSON.parse(body));
            });

            break;
        }
            
        case "PUT": 
        {
            let body = "";

            request.on("data", data => 
            {
                body += data.toString();
            });

            request.on("end", () => 
            {
                updateFaculty(request, response, JSON.parse(body));
            });

            break;

        }
        case "DELETE": 
        {
            Faculty.findByPk(request.url.split('/')[3])
                .then(result => 
                {
                    Faculty.destroy({where: {faculty: decodeURI(request.url.split('/')[3])}})
                    .then(resultD => 
                        {
                        if (resultD == 0) 
                        {
                            throw new Error('Faculty not found')
                        } 
                        else 
                        {
                            response.end(JSON.stringify(result))
                        }
                    })
                    .catch(error => errorHandler(response, 500, error.message));
                }).catch(error => errorHandler(response, 500, error.message));

           

            break;
        }
            
        default:
        {
            errorHandler(response, 405, 'Method Not Allowed');
            break;
        }
    }
};


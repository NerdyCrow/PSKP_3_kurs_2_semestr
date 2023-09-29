require("dotenv").config({ path: ".env" });
const express = require("express");
const bodyParser = require("body-parser");
const jsonRouter = require("express-json-rpc-router");

const controller = {
    sum(params, raw) {
        return Object.values(params).reduce(
            (sum, currentValue) => sum + currentValue,
            0
        );
    },
    mul(params, raw) {
        return Object.values(params).reduce(
            (mul, currentValue) => mul * currentValue,
            1
        );
    },
    div(params, raw) {
        params = Object.values(params);
        return params[0] / params[1];
    },
    proc(params, raw) {
        params = Object.values(params);
        return (params[0] / params[1]) * 100;
    },
};

const baseValidator = (params) => {
    params = Object.values(params);

    if (params.length < 2) {
        throw new Error("Not enough params");
    }

    params.forEach((item) => {
        if (typeof item !== "number") {
            throw new Error("Params must be numbers");
        }
    });
};

const divisionByZero = (params) => {
    params = Object(params);

    baseValidator(params);

    if (params.x !== undefined) {
        if (params.y === 0) {
            throw new Error("Second param can't be zero");
        }
    }
    else {
        params = Object.values(params);

        if (params[1] === 0) {
            throw new Error("Second param can't be zero");
        }
    }

};

const beforeController = {
    sum: (params) => baseValidator(params),
    mul: (params) => baseValidator(params),
    div: (params) => divisionByZero(params),
    proc: (params) => divisionByZero(params),
};

const app = express();

app.use(bodyParser.json());
app.use(
    jsonRouter({
        methods: controller,
        beforeMethods: beforeController,
        onError(error) {
            console.log(error);
        },
    })
);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});

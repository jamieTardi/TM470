'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const body_parser_1 = __importDefault(require('body-parser'));
const mongoose_1 = __importDefault(require('mongoose'));
const cors_1 = __importDefault(require('cors'));
const dotenv_1 = __importDefault(require('dotenv'));
const user_1 = __importDefault(require('./routes/user'));
const customer_1 = __importDefault(require('./routes/customer'));
const bookings_1 = __importDefault(require('./routes/bookings'));
const staff_1 = __importDefault(require('./routes/staff'));
const lakes_1 = __importDefault(require('./routes/lakes'));
const user_2 = require('./controllers/user');
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use((0, cors_1.default)());
app.use('/user', user_1.default);
app.use('/lakes', lakes_1.default);
app.use('/customer', customer_1.default);
app.use('/bookings', bookings_1.default);
app.use('/staff', staff_1.default);
app.get('/', (req, res) => {
	res.send('lake admin Api Home');
});
const dbConnection = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;
mongoose_1.default
	.connect(dbConnection)
	.then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
	.catch((e) => console.log(e));
//TODO: Remove for prod
// generateNewUser({
// 	firstName: "Dexter",
// 	lastName: "Tardi",
// 	password: "cheese",
// 	email: "jamietardi1@gmail.com",
// 	role: "admin",
// 	parentId: "",
// 	myLakes: [],
// 	phoneNo: "123456",
// });
(0, user_2.generateNewUser)({
	firstName: 'Fred',
	lastName: 'Jones',
	password: 'cheese',
	email: 'testcase1@gmail.com',
	role: 'admin',
	parentId: '630fa60a75c7b6ae99a4dadb',
	myLakes: [],
	phoneNo: '07557990224',
});

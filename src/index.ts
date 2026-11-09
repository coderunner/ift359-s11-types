import { a, plus1 as add1 } from "./module.js";

console.log(a);
add1(2);

import * as module from "./module.js";

console.log(module.a);
module.plus1(2);

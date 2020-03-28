(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList === 'function' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$Success = {$: 'Success'};
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$List$sortBy = _List_sortBy;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Main$teamMemberDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (username, rating) {
			return {blitzRating: rating, username: username};
		}),
	A2($elm$json$Json$Decode$field, 'username', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'perfs',
		A2(
			$elm$json$Json$Decode$field,
			'blitz',
			A2($elm$json$Json$Decode$field, 'rating', $elm$json$Json$Decode$int))));
var $author$project$Data$usersData = '{"id":"frederickdewit","username":"FrederickdeWit","online":false,"perfs":{"blitz":{"games":7,"rating":2041,"rd":127,"prog":0,"prov":true},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1585337471679,"seenAt":1585380222985,"playTime":{"total":2797,"tv":0},"language":"de-DE","url":"https://lichess.org/@/FrederickdeWit"}\r\n       {"id":"matschusn","username":"matschusn","online":false,"perfs":{"blitz":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"bullet":{"games":11,"rating":2020,"rd":108,"prog":0},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1585338460199,"seenAt":1585345665744,"playTime":{"total":3810,"tv":0},"language":"de-DE","url":"https://lichess.org/@/matschusn"}\r\n       {"id":"liliencron","username":"liliencron","online":false,"perfs":{"blitz":{"games":4640,"rating":2215,"rd":51,"prog":-15},"puzzle":{"games":174,"rating":2170,"rd":83,"prog":-31},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":13,"rating":2330,"rd":131,"prog":32,"prov":true},"rapid":{"games":366,"rating":2269,"rd":47,"prog":19}},"createdAt":1467139146889,"seenAt":1585329634980,"playTime":{"total":2361041,"tv":13635},"language":"de-DE","url":"https://lichess.org/@/liliencron"}\r\n       {"id":"antonamadeus","username":"Antonamadeus","online":false,"perfs":{"blitz":{"games":52,"rating":2031,"rd":51,"prog":41},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1585248759909,"seenAt":1585351142002,"playTime":{"total":32501,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Antonamadeus"}\r\n       {"id":"callangm","username":"CALLANGM","online":true,"perfs":{"chess960":{"games":3,"rating":1189,"rd":202,"prog":0,"prov":true},"antichess":{"games":7,"rating":1248,"rd":173,"prog":0,"prov":true},"puzzle":{"games":14,"rating":1658,"rd":99,"prog":-18},"blitz":{"games":188,"rating":1475,"rd":45,"prog":0},"kingOfTheHill":{"games":1,"rating":1333,"rd":248,"prog":0,"prov":true},"crazyhouse":{"games":4,"rating":1494,"rd":171,"prog":0,"prov":true},"threeCheck":{"games":23,"rating":1306,"rd":84,"prog":-10},"bullet":{"games":14,"rating":1419,"rd":145,"prog":-26,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":127,"rating":1587,"rd":45,"prog":5}},"createdAt":1584976848101,"seenAt":1585382406259,"playTime":{"total":98628,"tv":0},"language":"en-GB","playing":true,"url":"https://lichess.org/@/CALLANGM"}\r\n       {"id":"bjork-venus-as-a-boy","username":"Bjork-Venus-as-a-boy","online":false,"perfs":{"puzzle":{"games":208,"rating":2042,"rd":65,"prog":47},"blitz":{"games":717,"rating":2191,"rd":45,"prog":8},"crazyhouse":{"games":82,"rating":1757,"rd":55,"prog":-4},"bullet":{"games":204,"rating":2060,"rd":52,"prog":-8},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1461390391082,"profile":{"country":"IS","bio":"Leon Killer","fideRating":1811,"links":"https://vk.com/public193473473  https://www.youtube.com/channel/UC8546Zxo3yGq07qcQPWxECw?view_as=subscriber  https://t.me/coolchesstactics  https://www.chess.com/member/bjork-venus-as-a-boy"},"seenAt":1585369268786,"playTime":{"total":217486,"tv":2040},"language":"en-US","url":"https://lichess.org/@/Bjork-Venus-as-a-boy"}\r\n       {"id":"thetacticbot1235","username":"thetacticbot1235","online":false,"perfs":{"chess960":{"games":24,"rating":1605,"rd":77,"prog":-8},"antichess":{"games":31,"rating":1527,"rd":81,"prog":-82},"atomic":{"games":10,"rating":1394,"rd":147,"prog":0,"prov":true},"racingKings":{"games":2,"rating":1377,"rd":252,"prog":0,"prov":true},"ultraBullet":{"games":1083,"rating":1705,"rd":45,"prog":-12},"blitz":{"games":180,"rating":1829,"rd":45,"prog":18},"kingOfTheHill":{"games":1,"rating":1460,"rd":311,"prog":0,"prov":true},"crazyhouse":{"games":10,"rating":1532,"rd":118,"prog":0,"prov":true},"threeCheck":{"games":7,"rating":1571,"rd":152,"prog":0,"prov":true},"bullet":{"games":4,"rating":2106,"rd":228,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"horde":{"games":22,"rating":1520,"rd":135,"prog":-107,"prov":true},"puzzle":{"games":49,"rating":2117,"rd":117,"prog":28,"prov":true},"classical":{"games":8,"rating":2103,"rd":123,"prog":0,"prov":true},"rapid":{"games":11,"rating":1817,"rd":107,"prog":0}},"createdAt":1580083764592,"profile":{"country":"BO","location":"La Paz","bio":"Soy Un Jugador Agresivo  Mis Aperturas Favoritas son Gambito Evans Y Gambito Escoses y Defensas contra e4  siciliana dragon y d4 defensa india de rey y contra siciliana ultilizo la variante cerrada","firstName":"juan","lastName":"rodriguez","fideRating":1703},"seenAt":1585360999717,"playTime":{"total":134650,"tv":1858},"language":"es-ES","url":"https://lichess.org/@/thetacticbot1235"}\r\n       {"id":"sphumee","username":"Sphumee","online":false,"perfs":{"blitz":{"games":265,"rating":1802,"rd":45,"prog":19},"puzzle":{"games":13,"rating":2056,"rd":105,"prog":0},"bullet":{"games":20,"rating":1742,"rd":78,"prog":-70},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584807653964,"profile":{"country":"ZW"},"seenAt":1585378979531,"playTime":{"total":81543,"tv":647},"language":"en-US","url":"https://lichess.org/@/Sphumee"}\r\n       {"id":"maks_2011","username":"Maks_2011","online":false,"perfs":{"chess960":{"games":9,"rating":1621,"rd":143,"prog":0,"prov":true},"antichess":{"games":28,"rating":1453,"rd":106,"prog":41},"atomic":{"games":56,"rating":1376,"rd":108,"prog":29},"racingKings":{"games":4,"rating":1527,"rd":207,"prog":0,"prov":true},"ultraBullet":{"games":3,"rating":1331,"rd":245,"prog":0,"prov":true},"blitz":{"games":596,"rating":2052,"rd":45,"prog":10},"kingOfTheHill":{"games":23,"rating":1627,"rd":115,"prog":109,"prov":true},"crazyhouse":{"games":10,"rating":1367,"rd":145,"prog":0,"prov":true},"threeCheck":{"games":18,"rating":1635,"rd":119,"prog":-38,"prov":true},"bullet":{"games":127,"rating":1898,"rd":47,"prog":-22},"correspondence":{"games":2,"rating":2047,"rd":233,"prog":0,"prov":true},"horde":{"games":11,"rating":1476,"rd":169,"prog":0,"prov":true},"puzzle":{"games":387,"rating":1885,"rd":63,"prog":31},"classical":{"games":4,"rating":1728,"rd":192,"prog":0,"prov":true},"rapid":{"games":215,"rating":1949,"rd":59,"prog":15}},"createdAt":1541514822466,"profile":{"country":"RU"},"seenAt":1585335832400,"playTime":{"total":428632,"tv":5012},"language":"ru-RU","url":"https://lichess.org/@/Maks_2011"}\r\n       {"id":"k_ira","username":"K_Ira","online":true,"perfs":{"blitz":{"games":81,"rating":2586,"rd":48,"prog":-15},"puzzle":{"games":44,"rating":2194,"rd":73,"prog":-13},"bullet":{"games":919,"rating":2474,"rd":45,"prog":9},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1582859719397,"seenAt":1585382734790,"playTime":{"total":102760,"tv":156},"language":"ru-RU","url":"https://lichess.org/@/K_Ira"}\r\n       {"id":"ldsteger","username":"LDSteger","online":false,"perfs":{"chess960":{"games":1,"rating":1662,"rd":248,"prog":0,"prov":true},"blitz":{"games":81,"rating":1687,"rd":47,"prog":19},"kingOfTheHill":{"games":2,"rating":1710,"rd":214,"prog":0,"prov":true},"threeCheck":{"games":3,"rating":1807,"rd":203,"prog":0,"prov":true},"bullet":{"games":1,"rating":1431,"rd":286,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"horde":{"games":1,"rating":1596,"rd":290,"prog":0,"prov":true},"puzzle":{"games":9,"rating":2139,"rd":131,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1585167564184,"seenAt":1585351360240,"playTime":{"total":24396,"tv":428},"language":"de-DE","url":"https://lichess.org/@/LDSteger"}\r\n       {"id":"ehenkes","username":"ehenkes","online":false,"perfs":{"blitz":{"games":2200,"rating":1986,"rd":45,"prog":-4},"puzzle":{"games":168,"rating":2341,"rd":82,"prog":50},"atomic":{"games":1,"rating":1288,"rd":262,"prog":0,"prov":true},"bullet":{"games":4705,"rating":1932,"rd":45,"prog":9},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":86,"rating":2117,"rd":59,"prog":9}},"createdAt":1563284489226,"profile":{"country":"DE","location":"Einhausen","bio":"Vereinsspieler in Worms und Einhausen","firstName":"Erhard","lastName":"Henkes, Dr.","fideRating":1803},"seenAt":1585353560478,"playTime":{"total":1389670,"tv":3818},"language":"de-DE","url":"https://lichess.org/@/ehenkes"}\r\n       {"id":"chainsoffantasia","username":"ChainsOfFantasia","online":false,"perfs":{"blitz":{"games":29,"rating":2466,"rd":73,"prog":86},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1585167237905,"profile":{"location":"Loserville, Kentucky hailing from Flagville, Arizona.","bio":"Maybe, just maybe, there is no purpose in life. But if you linger a while longer in this world, you might discover something of value in it.","firstName":"Kurt Erwin","lastName":"Blages"},"seenAt":1585345083102,"playTime":{"total":18312,"tv":0},"language":"de-DE","url":"https://lichess.org/@/ChainsOfFantasia"}\r\n       {"id":"halil0717","username":"halil0717","online":false,"perfs":{"chess960":{"games":6,"rating":1000,"rd":199,"prog":0,"prov":true},"antichess":{"games":5,"rating":969,"rd":188,"prog":0,"prov":true},"atomic":{"games":25,"rating":1157,"rd":111,"prog":66,"prov":true},"racingKings":{"games":8,"rating":1429,"rd":175,"prog":0,"prov":true},"ultraBullet":{"games":240,"rating":1269,"rd":67,"prog":80},"blitz":{"games":280,"rating":1586,"rd":50,"prog":52},"kingOfTheHill":{"games":12,"rating":1387,"rd":160,"prog":-133,"prov":true},"crazyhouse":{"games":22,"rating":1091,"rd":138,"prog":31,"prov":true},"threeCheck":{"games":8,"rating":1069,"rd":202,"prog":0,"prov":true},"bullet":{"games":423,"rating":1578,"rd":49,"prog":-25},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"horde":{"games":21,"rating":1228,"rd":184,"prog":88,"prov":true},"puzzle":{"games":227,"rating":1534,"rd":75,"prog":55},"classical":{"games":113,"rating":1132,"rd":93,"prog":108},"rapid":{"games":146,"rating":1374,"rd":63,"prog":57}},"createdAt":1546020474429,"profile":{"country":"TR","firstName":"Halil Buğra","lastName":"SAYMAN"},"seenAt":1585328712124,"playTime":{"total":318930,"tv":1273},"language":"tr-TR","url":"https://lichess.org/@/halil0717"}\r\n       {"id":"konigdesschachs","username":"Konigdesschachs","online":false,"perfs":{"chess960":{"games":32,"rating":1562,"rd":89,"prog":-20},"antichess":{"games":14,"rating":1224,"rd":174,"prog":-3,"prov":true},"atomic":{"games":12,"rating":1599,"rd":199,"prog":-27,"prov":true},"blitz":{"games":1342,"rating":2011,"rd":45,"prog":1},"kingOfTheHill":{"games":1,"rating":1753,"rd":288,"prog":0,"prov":true},"crazyhouse":{"games":12,"rating":1670,"rd":128,"prog":-13,"prov":true},"bullet":{"games":572,"rating":1662,"rd":46,"prog":-43},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"horde":{"games":4,"rating":1759,"rd":198,"prog":0,"prov":true},"puzzle":{"games":672,"rating":1691,"rd":67,"prog":-39},"classical":{"games":19,"rating":1895,"rd":100,"prog":-28},"rapid":{"games":616,"rating":1979,"rd":63,"prog":-1}},"createdAt":1561994712348,"profile":{"country":"TR","location":"samsun","firstName":"engin","lastName":"öz","fideRating":1412,"links":"https://www.twitch.tv/engin56789  https://www.chess.com/member/saman-ye55"},"seenAt":1585350301095,"playTime":{"total":1026504,"tv":2878},"language":"tr-TR","url":"https://lichess.org/@/Konigdesschachs"}\r\n       {"id":"meshkov_maksim_2011","username":"Meshkov_Maksim_2011","online":false,"perfs":{"chess960":{"games":2,"rating":1277,"rd":227,"prog":0,"prov":true},"antichess":{"games":32,"rating":1180,"rd":116,"prog":-31,"prov":true},"atomic":{"games":49,"rating":1163,"rd":91,"prog":-40},"racingKings":{"games":18,"rating":1592,"rd":117,"prog":97,"prov":true},"ultraBullet":{"games":41,"rating":967,"rd":114,"prog":-85,"prov":true},"blitz":{"games":182,"rating":1207,"rd":54,"prog":23},"kingOfTheHill":{"games":4,"rating":1214,"rd":211,"prog":0,"prov":true},"crazyhouse":{"games":18,"rating":1336,"rd":117,"prog":105,"prov":true},"threeCheck":{"games":2,"rating":1314,"rd":255,"prog":0,"prov":true},"bullet":{"games":114,"rating":1103,"rd":53,"prog":7},"correspondence":{"games":10,"rating":1170,"rd":145,"prog":0,"prov":true},"horde":{"games":2,"rating":1365,"rd":253,"prog":0,"prov":true},"puzzle":{"games":1087,"rating":1427,"rd":66,"prog":-41},"classical":{"games":61,"rating":1127,"rd":87,"prog":-57},"rapid":{"games":420,"rating":1302,"rd":48,"prog":23}},"createdAt":1553189533136,"profile":{"country":"RU"},"seenAt":1585166262868,"playTime":{"total":385578,"tv":2961},"language":"ru-RU","url":"https://lichess.org/@/Meshkov_Maksim_2011"}\r\n       {"id":"setarkos","username":"Setarkos","online":false,"perfs":{"chess960":{"games":8,"rating":1305,"rd":181,"prog":0,"prov":true},"blitz":{"games":147,"rating":1389,"rd":54,"prog":7},"puzzle":{"games":121,"rating":1515,"rd":87,"prog":-59},"bullet":{"games":1,"rating":1307,"rd":258,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":5,"rating":1249,"rd":179,"prog":0,"prov":true},"rapid":{"games":628,"rating":1523,"rd":54,"prog":3}},"createdAt":1500807345244,"seenAt":1585256409071,"playTime":{"total":447128,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Setarkos"}\r\n       {"id":"profediegoalejandro","username":"profediegoalejandro","online":false,"perfs":{"chess960":{"games":5,"rating":1543,"rd":173,"prog":0,"prov":true},"blitz":{"games":4210,"rating":2081,"rd":45,"prog":4},"puzzle":{"games":2114,"rating":2125,"rd":69,"prog":86},"ultraBullet":{"games":312,"rating":1629,"rd":97,"prog":-19},"bullet":{"games":4559,"rating":2090,"rd":45,"prog":29},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":7,"rating":1735,"rd":143,"prog":0,"prov":true},"rapid":{"games":422,"rating":2031,"rd":73,"prog":21}},"createdAt":1532380730786,"profile":{"country":"CO","location":"Duitama,Boyacá ","firstName":"Diego","lastName":"Alejandro","fideRating":1206,"links":"https://www.twitch.tv/profediegoalejandro"},"seenAt":1585365446256,"playTime":{"total":2144983,"tv":3559},"language":"es-ES","url":"https://lichess.org/@/profediegoalejandro"}\r\n       {"id":"paranabr","username":"paranabr","online":false,"perfs":{"ultraBullet":{"games":9,"rating":1692,"rd":162,"prog":0,"prov":true},"blitz":{"games":132,"rating":2252,"rd":47,"prog":-3},"crazyhouse":{"games":21,"rating":2070,"rd":133,"prog":82,"prov":true},"bullet":{"games":276,"rating":2240,"rd":104,"prog":-38},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1508197510596,"profile":{"country":"BR"},"seenAt":1585257740169,"playTime":{"total":56598,"tv":520},"language":"pt-BR","url":"https://lichess.org/@/paranabr"}\r\n       {"id":"blaugelb","username":"blaugelb","online":false,"perfs":{"chess960":{"games":1,"rating":1720,"rd":271,"prog":0,"prov":true},"antichess":{"games":5,"rating":1613,"rd":212,"prog":0,"prov":true},"horde":{"games":558,"rating":1953,"rd":111,"prog":-16,"prov":true},"blitz":{"games":9312,"rating":2212,"rd":45,"prog":-13},"kingOfTheHill":{"games":1,"rating":1447,"rd":312,"prog":0,"prov":true},"threeCheck":{"games":738,"rating":1872,"rd":71,"prog":-43},"bullet":{"games":1,"rating":1876,"rd":300,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":1,"rating":1653,"rd":262,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1526571435167,"seenAt":1585349768618,"playTime":{"total":2852047,"tv":159274},"language":"de-DE","url":"https://lichess.org/@/blaugelb"}\r\n       {"id":"fitty8x8","username":"fitty8x8","online":false,"perfs":{"blitz":{"games":12,"rating":1606,"rd":102,"prog":16},"puzzle":{"games":203,"rating":2006,"rd":75,"prog":34},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":1,"rating":1234,"rd":287,"prog":0,"prov":true}},"createdAt":1459886199880,"seenAt":1585340479549,"playTime":{"total":16123,"tv":0},"language":"de-DE","url":"https://lichess.org/@/fitty8x8"}\r\n       {"id":"gambitciomer","username":"GambitciOmer","online":false,"perfs":{"chess960":{"games":1,"rating":1647,"rd":277,"prog":0,"prov":true},"ultraBullet":{"games":3,"rating":1247,"rd":244,"prog":0,"prov":true},"blitz":{"games":88,"rating":1852,"rd":45,"prog":-17},"crazyhouse":{"games":20,"rating":1663,"rd":89,"prog":-102},"threeCheck":{"games":13,"rating":1379,"rd":100,"prog":-46},"bullet":{"games":125,"rating":1854,"rd":45,"prog":7},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"horde":{"games":1,"rating":1706,"rd":283,"prog":0,"prov":true},"puzzle":{"games":95,"rating":2447,"rd":74,"prog":-31},"classical":{"games":21,"rating":2009,"rd":82,"prog":-6},"rapid":{"games":102,"rating":1968,"rd":46,"prog":0}},"createdAt":1580069215322,"seenAt":1585350249164,"playTime":{"total":126743,"tv":376},"language":"tr-TR","url":"https://lichess.org/@/GambitciOmer"}\r\n       {"id":"franklyknight","username":"franklyknight","online":false,"perfs":{"chess960":{"games":2,"rating":1320,"rd":220,"prog":0,"prov":true},"blitz":{"games":100,"rating":1651,"rd":45,"prog":6},"puzzle":{"games":135,"rating":2032,"rd":72,"prog":-51},"bullet":{"games":542,"rating":1423,"rd":45,"prog":11},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":6,"rating":1672,"rd":154,"prog":0,"prov":true},"rapid":{"games":139,"rating":1807,"rd":45,"prog":-13}},"createdAt":1580021186538,"seenAt":1585350300676,"playTime":{"total":192986,"tv":0},"language":"tr-TR","url":"https://lichess.org/@/franklyknight"}\r\n       {"id":"mjk020811","username":"MJK020811","online":false,"perfs":{"blitz":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584553400344,"seenAt":1585244976379,"playTime":{"total":0,"tv":0},"language":"de-DE","url":"https://lichess.org/@/MJK020811"}\r\n       {"id":"jeffforever","username":"jeffforever","online":true,"perfs":{"chess960":{"games":222,"rating":2281,"rd":63,"prog":3},"antichess":{"games":258,"rating":1990,"rd":97,"prog":-8},"atomic":{"games":16,"rating":1554,"rd":139,"prog":231,"prov":true},"racingKings":{"games":26,"rating":1951,"rd":132,"prog":-53,"prov":true},"ultraBullet":{"games":293,"rating":2017,"rd":50,"prog":-18},"blitz":{"games":4050,"rating":2552,"rd":45,"prog":29},"kingOfTheHill":{"games":157,"rating":2128,"rd":66,"prog":-26},"crazyhouse":{"games":68,"rating":2096,"rd":71,"prog":-46},"threeCheck":{"games":209,"rating":2106,"rd":64,"prog":-11},"bullet":{"games":1209,"rating":2657,"rd":45,"prog":33},"correspondence":{"games":41,"rating":2091,"rd":216,"prog":129,"prov":true},"horde":{"games":112,"rating":1946,"rd":83,"prog":-52},"puzzle":{"games":4073,"rating":2241,"rd":74,"prog":9},"classical":{"games":9,"rating":2168,"rd":158,"prog":0,"prov":true},"rapid":{"games":89,"rating":2398,"rd":80,"prog":57}},"createdAt":1385999390135,"profile":{"country":"DE","location":"Stuttgart","bio":"Organisator deutschsprachiger Quarantäne-Teamkämpfe. Infos: https://rochadeeuropa.com/lichess-turniere    Welcome to join:  https://lichess.org/team/rochade-europa-schachzeitung https://lichess.org/team/amateur-chess-organization https://lichess.org/team/orgateam-deutschsprachige-turniere https://lichess.org/team/streamer  https://imgur.com/iHfuJjv  https://imgur.com/F6gr4vc    Subscribe on YouTube: https://www.youtube.com/user/AmateurChesscom & https://www.youtube.com/channel/UCyo4l_uDF4d5VlprX2x10Uw    Amateur Chess Org.: https://amateurchess.com/","firstName":"Jens","lastName":"Hirneise","fideRating":2289,"links":"https://www.youtube.com/channel/UCyo4l_uDF4d5VlprX2x10Uw?sub_confirmation=1  https://www.youtube.com/user/AmateurChesscom?sub_confirmation=1  https://amateurchess.com  https://rochadeeuropa.com  https://twitch.tv/rochadeschachzeitung  https://chess24.com/en/profile/rochadeeuropa  https://www.chess.com/members/view/Giorno  https://www.facebook.com/jens.hirneise  https://www.instagram.com/jeffforever/"},"seenAt":1585382920067,"patron":true,"playTime":{"total":2042343,"tv":247072},"language":"de-DE","title":"FM","url":"https://lichess.org/@/jeffforever"}\r\n       {"id":"olegira","username":"OLEGIRA","online":false,"perfs":{"puzzle":{"games":63,"rating":2003,"rd":89,"prog":34},"atomic":{"games":8,"rating":1121,"rd":199,"prog":0,"prov":true},"ultraBullet":{"games":1,"rating":982,"rd":350,"prog":0,"prov":true},"blitz":{"games":10327,"rating":2034,"rd":45,"prog":21},"crazyhouse":{"games":1,"rating":1439,"rd":303,"prog":0,"prov":true},"threeCheck":{"games":5,"rating":1510,"rd":211,"prog":0,"prov":true},"bullet":{"games":700,"rating":1943,"rd":45,"prog":-37},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":10,"rating":1966,"rd":157,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1510685933908,"profile":{"country":"UA"},"seenAt":1585335971729,"playTime":{"total":2824603,"tv":131},"language":"ru-RU","url":"https://lichess.org/@/OLEGIRA"}\r\n       {"id":"dsedward","username":"dsedward","online":false,"perfs":{"chess960":{"games":1,"rating":1569,"rd":299,"prog":0,"prov":true},"blitz":{"games":1376,"rating":1421,"rd":45,"prog":3},"atomic":{"games":159,"rating":1576,"rd":77,"prog":48},"ultraBullet":{"games":1,"rating":1289,"rd":265,"prog":0,"prov":true},"bullet":{"games":68,"rating":1150,"rd":58,"prog":-23},"correspondence":{"games":2,"rating":1123,"rd":286,"prog":0,"prov":true},"horde":{"games":3,"rating":1339,"rd":232,"prog":0,"prov":true},"puzzle":{"games":879,"rating":1579,"rd":64,"prog":51},"classical":{"games":100,"rating":1176,"rd":97,"prog":-13},"rapid":{"games":272,"rating":1255,"rd":53,"prog":6}},"createdAt":1557524159530,"profile":{"country":"US","location":"Durham, NC","firstName":"Drake","lastName":"Edwards"},"seenAt":1585347995155,"playTime":{"total":888312,"tv":1073},"language":"en-US","url":"https://lichess.org/@/dsedward"}\r\n       {"id":"ignatij","username":"Ignatij","online":false,"perfs":{"chess960":{"games":5,"rating":1596,"rd":158,"prog":0,"prov":true},"antichess":{"games":33,"rating":1489,"rd":90,"prog":6},"atomic":{"games":7,"rating":1387,"rd":180,"prog":0,"prov":true},"racingKings":{"games":1,"rating":1629,"rd":292,"prog":0,"prov":true},"ultraBullet":{"games":98,"rating":1411,"rd":49,"prog":53},"blitz":{"games":227,"rating":1749,"rd":45,"prog":-8},"kingOfTheHill":{"games":2,"rating":1425,"rd":309,"prog":0,"prov":true},"crazyhouse":{"games":31,"rating":1403,"rd":116,"prog":-11,"prov":true},"threeCheck":{"games":3,"rating":1304,"rd":203,"prog":0,"prov":true},"bullet":{"games":161,"rating":1773,"rd":45,"prog":3},"correspondence":{"games":12,"rating":1589,"rd":143,"prog":-3,"prov":true},"horde":{"games":11,"rating":1395,"rd":152,"prog":0,"prov":true},"puzzle":{"games":2213,"rating":2761,"rd":95,"prog":-12},"classical":{"games":60,"rating":1836,"rd":62,"prog":5},"rapid":{"games":386,"rating":1846,"rd":45,"prog":7}},"createdAt":1524836912714,"profile":{"country":"BY","bio":".","firstName":"Игнатий","lastName":"Ших","fideRating":1600,"uscfRating":1600,"ecfRating":12},"seenAt":1585380529037,"playTime":{"total":436238,"tv":2008},"language":"ru-RU","url":"https://lichess.org/@/Ignatij"}\r\n       {"id":"nimzocologne","username":"NimzoCologne","online":false,"perfs":{"blitz":{"games":87,"rating":2350,"rd":45,"prog":-18},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":1,"rating":2211,"rd":336,"prog":0,"prov":true},"rapid":{"games":32,"rating":2282,"rd":69,"prog":110}},"createdAt":1584313184373,"seenAt":1585323780868,"playTime":{"total":45778,"tv":1080},"language":"de-DE","url":"https://lichess.org/@/NimzoCologne"}\r\n       {"id":"prismaticwall","username":"PrismaticWall","online":false,"perfs":{"blitz":{"games":306,"rating":2365,"rd":45,"prog":-10},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584961965025,"profile":{"country":"DE","bio":"Prismatic Wall  School abjuration; Level sorcerer/wizard 8; Subdomain isolation 8  Casting Time 1 standard action  Components V, S  Range close (25 ft. + 5 ft./2 levels)  Effect wall 4 ft./level wide, 2 ft./level high  Duration 10 min./level (D)  Saving Throw see text; Spell Resistance see text"},"seenAt":1585352370132,"playTime":{"total":81638,"tv":0},"language":"de-DE","url":"https://lichess.org/@/PrismaticWall"}\r\n       {"id":"threejay","username":"ThreeJay","online":false,"perfs":{"blitz":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"puzzle":{"games":5,"rating":1892,"rd":177,"prog":0,"prov":true},"bullet":{"games":1,"rating":1332,"rd":249,"prog":0,"prov":true},"correspondence":{"games":3,"rating":1374,"rd":216,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1546462264751,"seenAt":1585207639097,"playTime":{"total":91,"tv":0},"language":"de-DE","url":"https://lichess.org/@/ThreeJay"}\r\n       {"id":"bill_chiper_a4","username":"Bill_Chiper_a4","online":false,"perfs":{"blitz":{"games":119,"rating":1232,"rd":45,"prog":8},"antichess":{"games":4,"rating":1329,"rd":190,"prog":0,"prov":true},"puzzle":{"games":282,"rating":1717,"rd":63,"prog":-31},"atomic":{"games":3,"rating":1247,"rd":243,"prog":0,"prov":true},"ultraBullet":{"games":56,"rating":1232,"rd":67,"prog":68},"bullet":{"games":128,"rating":1160,"rd":45,"prog":6},"correspondence":{"games":4,"rating":1630,"rd":184,"prog":0,"prov":true},"classical":{"games":76,"rating":1567,"rd":51,"prog":8},"rapid":{"games":51,"rating":1405,"rd":59,"prog":-7}},"createdAt":1577289138078,"profile":{"country":"DE","location":"Nördlingen","firstName":"Peter","links":"Discord  "},"seenAt":1585340054693,"playTime":{"total":168649,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Bill_Chiper_a4"}\r\n       {"id":"challangergenc","username":"challangergenc","online":false,"perfs":{"chess960":{"games":14,"rating":1390,"rd":111,"prog":-79,"prov":true},"antichess":{"games":33,"rating":1435,"rd":74,"prog":-71},"puzzle":{"games":79,"rating":2011,"rd":69,"prog":72},"atomic":{"games":79,"rating":1212,"rd":65,"prog":-7},"racingKings":{"games":9,"rating":1237,"rd":170,"prog":0,"prov":true},"ultraBullet":{"games":69,"rating":1204,"rd":53,"prog":35},"blitz":{"games":119,"rating":1456,"rd":45,"prog":38},"kingOfTheHill":{"games":5,"rating":1350,"rd":189,"prog":0,"prov":true},"threeCheck":{"games":13,"rating":1565,"rd":124,"prog":-143,"prov":true},"bullet":{"games":71,"rating":1335,"rd":56,"prog":-5},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":89,"rating":1665,"rd":46,"prog":-23},"rapid":{"games":11,"rating":1346,"rd":134,"prog":0,"prov":true}},"createdAt":1573371228164,"seenAt":1585339841762,"playTime":{"total":118699,"tv":811},"language":"tr-TR","url":"https://lichess.org/@/challangergenc"}\r\n       {"id":"e4e5f4exf4nicht","username":"e4e5f4exf4nicht","online":false,"perfs":{"blitz":{"games":370,"rating":1560,"rd":49,"prog":-14},"puzzle":{"games":10072,"rating":1712,"rd":65,"prog":-14},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":2,"rating":1448,"rd":307,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":86,"rating":1697,"rd":55,"prog":-7}},"createdAt":1563350970788,"profile":{"country":"DE"},"seenAt":1585381481051,"playTime":{"total":319253,"tv":833},"language":"de-DE","url":"https://lichess.org/@/e4e5f4exf4nicht"}\r\n       {"id":"basicblues","username":"BasicBlues","online":false,"perfs":{"blitz":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584901611927,"seenAt":1584902502276,"playTime":{"total":0,"tv":0},"language":"de-DE","url":"https://lichess.org/@/BasicBlues"}\r\n       {"id":"elo-hunter2","username":"Elo-Hunter2","online":true,"perfs":{"blitz":{"games":586,"rating":1587,"rd":45,"prog":8},"puzzle":{"games":3,"rating":1560,"rd":184,"prog":0,"prov":true},"bullet":{"games":1,"rating":1311,"rd":248,"prog":0,"prov":true},"correspondence":{"games":1,"rating":1410,"rd":292,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":6,"rating":1808,"rd":178,"prog":0,"prov":true}},"createdAt":1564264576676,"seenAt":1585382435762,"playTime":{"total":171394,"tv":0},"language":"de-DE","playing":true,"url":"https://lichess.org/@/Elo-Hunter2"}\r\n       {"id":"dennis05","username":"dennis05","online":false,"perfs":{"chess960":{"games":6,"rating":1512,"rd":200,"prog":0,"prov":true},"antichess":{"games":4,"rating":1735,"rd":178,"prog":0,"prov":true},"atomic":{"games":4,"rating":1266,"rd":226,"prog":0,"prov":true},"racingKings":{"games":1,"rating":1257,"rd":271,"prog":0,"prov":true},"ultraBullet":{"games":265,"rating":1649,"rd":107,"prog":-28},"blitz":{"games":1464,"rating":1999,"rd":45,"prog":0},"crazyhouse":{"games":41,"rating":1631,"rd":95,"prog":18},"threeCheck":{"games":2,"rating":1425,"rd":302,"prog":0,"prov":true},"bullet":{"games":4332,"rating":1998,"rd":52,"prog":-18},"correspondence":{"games":49,"rating":1659,"rd":102,"prog":-141},"horde":{"games":2,"rating":1429,"rd":294,"prog":0,"prov":true},"puzzle":{"games":826,"rating":1581,"rd":63,"prog":-10},"classical":{"games":139,"rating":1789,"rd":80,"prog":35},"rapid":{"games":364,"rating":1729,"rd":72,"prog":35}},"createdAt":1535308260023,"profile":{"country":"DE","location":"Dortmund","firstName":"Dennis","lastName":"Schulz","fideRating":1664},"seenAt":1585252076077,"playTime":{"total":1043260,"tv":941},"language":"de-DE","url":"https://lichess.org/@/dennis05"}\r\n       {"id":"magnuskarol","username":"MagnusKarol","online":false,"perfs":{"chess960":{"games":1,"rating":1337,"rd":329,"prog":0,"prov":true},"blitz":{"games":5417,"rating":1635,"rd":45,"prog":-33},"puzzle":{"games":45,"rating":1902,"rd":130,"prog":35,"prov":true},"bullet":{"games":3,"rating":1436,"rd":250,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":5,"rating":1471,"rd":170,"prog":0,"prov":true},"rapid":{"games":191,"rating":1524,"rd":108,"prog":-86}},"createdAt":1476111628128,"seenAt":1585382334700,"playTime":{"total":1754797,"tv":0},"language":"de-DE","url":"https://lichess.org/@/MagnusKarol"}\r\n       {"id":"bachess76","username":"bachess76","online":false,"perfs":{"chess960":{"games":1207,"rating":1996,"rd":65,"prog":-41},"antichess":{"games":2,"rating":1434,"rd":320,"prog":0,"prov":true},"puzzle":{"games":71,"rating":2147,"rd":117,"prog":-27,"prov":true},"blitz":{"games":7016,"rating":2397,"rd":45,"prog":14},"crazyhouse":{"games":52,"rating":1849,"rd":108,"prog":101},"bullet":{"games":1786,"rating":2243,"rd":53,"prog":26},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":48,"rating":2384,"rd":109,"prog":9}},"createdAt":1512997183067,"profile":{"country":"GR"},"seenAt":1585349404645,"playTime":{"total":3817701,"tv":224709},"language":"el-GR","url":"https://lichess.org/@/bachess76"}\r\n       {"id":"fanatist","username":"Fanatist","online":false,"perfs":{"puzzle":{"games":256,"rating":2312,"rd":96,"prog":-28},"ultraBullet":{"games":2956,"rating":2009,"rd":136,"prog":-1,"prov":true},"blitz":{"games":7263,"rating":2430,"rd":45,"prog":4},"kingOfTheHill":{"games":18,"rating":2160,"rd":135,"prog":210,"prov":true},"bullet":{"games":14074,"rating":2402,"rd":133,"prog":50,"prov":true},"correspondence":{"games":17,"rating":2118,"rd":113,"prog":188,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":21,"rating":2302,"rd":144,"prog":85,"prov":true}},"createdAt":1447108728857,"profile":{"country":"DE","location":"Duisburg","bio":"I´m professional coach and available for chess lessons. Feel free to contact me: juergenkaufeld@aol.com","firstName":"Jürgen","lastName":"Kaufeld"},"seenAt":1585352762277,"playTime":{"total":3429001,"tv":65814},"language":"de-DE","title":"FM","url":"https://lichess.org/@/Fanatist"}\r\n       {"id":"gral","username":"Gral","online":false,"perfs":{"chess960":{"games":67,"rating":1929,"rd":195,"prog":-6,"prov":true},"puzzle":{"games":331,"rating":2231,"rd":194,"prog":58,"prov":true},"blitz":{"games":489,"rating":2222,"rd":45,"prog":13},"crazyhouse":{"games":1,"rating":1725,"rd":336,"prog":0,"prov":true},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":237,"rating":2275,"rd":198,"prog":0,"prov":true}},"createdAt":1455733900135,"seenAt":1585223915949,"playTime":{"total":396552,"tv":19743},"language":"de-DE","url":"https://lichess.org/@/Gral"}\r\n       {"id":"t-rox","username":"T-Rox","online":false,"perfs":{"blitz":{"games":40,"rating":1538,"rd":106,"prog":26},"puzzle":{"games":10,"rating":2078,"rd":173,"prog":0,"prov":true},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":67,"rating":1657,"rd":73,"prog":48}},"createdAt":1512394817649,"profile":{"country":"DE","location":"living in the Rhine area between Cologne and Bonn","bio":"T-Rox colonensis is middle aged , but fit ...    I am interested in openings and endgames. Prefer to play with more time. You are welcome to exchange views.    https://3.bp.blogspot.com/-AyiVumDpxs8/VHdRpPi655I/AAAAAAAAcm0/aCnls27SFWc/s1600/shutterstock_102035362.jpg","firstName":"Ingo"},"seenAt":1585378101027,"playTime":{"total":61801,"tv":0},"language":"de-DE","url":"https://lichess.org/@/T-Rox"}\r\n       {"id":"mrquick","username":"MrQuick","online":false,"perfs":{"chess960":{"games":18,"rating":1527,"rd":149,"prog":-2,"prov":true},"antichess":{"games":12,"rating":1361,"rd":161,"prog":-43,"prov":true},"puzzle":{"games":1214,"rating":2020,"rd":63,"prog":48},"atomic":{"games":26,"rating":1214,"rd":152,"prog":48,"prov":true},"racingKings":{"games":72,"rating":1674,"rd":126,"prog":-5,"prov":true},"ultraBullet":{"games":163,"rating":1714,"rd":132,"prog":-38,"prov":true},"blitz":{"games":2716,"rating":2003,"rd":45,"prog":14},"kingOfTheHill":{"games":1,"rating":1793,"rd":284,"prog":0,"prov":true},"crazyhouse":{"games":74,"rating":1505,"rd":131,"prog":22,"prov":true},"threeCheck":{"games":106,"rating":1459,"rd":91,"prog":-60},"bullet":{"games":9673,"rating":2065,"rd":45,"prog":15},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":66,"rating":1672,"rd":118,"prog":-11,"prov":true},"rapid":{"games":15,"rating":1705,"rd":148,"prog":-68,"prov":true}},"createdAt":1532970061705,"seenAt":1585364905811,"playTime":{"total":1723097,"tv":428},"language":"de-DE","url":"https://lichess.org/@/MrQuick"}\r\n       {"id":"matewin","username":"matewin","online":false,"perfs":{"blitz":{"games":91,"rating":1504,"rd":59,"prog":14},"puzzle":{"games":197,"rating":1823,"rd":62,"prog":36},"bullet":{"games":1,"rating":1674,"rd":248,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":293,"rating":1562,"rd":45,"prog":23}},"createdAt":1582749207046,"seenAt":1585335607466,"playTime":{"total":110775,"tv":0},"language":"fr-FR","url":"https://lichess.org/@/matewin"}\r\n       {"id":"i_myas","username":"i_myas","online":false,"perfs":{"chess960":{"games":52,"rating":1419,"rd":106,"prog":46},"antichess":{"games":194,"rating":1521,"rd":80,"prog":10},"atomic":{"games":1124,"rating":1696,"rd":57,"prog":-9},"racingKings":{"games":79,"rating":1538,"rd":107,"prog":23},"ultraBullet":{"games":636,"rating":1452,"rd":47,"prog":5},"blitz":{"games":325,"rating":1639,"rd":48,"prog":4},"kingOfTheHill":{"games":142,"rating":1568,"rd":60,"prog":16},"crazyhouse":{"games":110,"rating":1564,"rd":85,"prog":40},"threeCheck":{"games":187,"rating":1618,"rd":56,"prog":27},"bullet":{"games":587,"rating":1618,"rd":46,"prog":-7},"correspondence":{"games":104,"rating":1276,"rd":136,"prog":-78,"prov":true},"horde":{"games":39,"rating":1428,"rd":97,"prog":21},"puzzle":{"games":1428,"rating":2618,"rd":88,"prog":-23},"classical":{"games":33,"rating":1401,"rd":104,"prog":72},"rapid":{"games":84,"rating":1732,"rd":64,"prog":83}},"createdAt":1509110050658,"profile":{"location":"Bataysk","bio":"🇬🇳🇬🇧🇷🇺🇺🇦🇺🇸  ","firstName":"Vyacheslav","lastName":"Myasnikov"},"seenAt":1585234957062,"playTime":{"total":560685,"tv":38176},"language":"ru-RU","url":"https://lichess.org/@/i_myas"}\r\n       {"id":"theo_koenig","username":"Theo_Koenig","online":true,"perfs":{"chess960":{"games":10,"rating":1277,"rd":142,"prog":0,"prov":true},"antichess":{"games":19,"rating":1438,"rd":121,"prog":143,"prov":true},"atomic":{"games":41,"rating":1302,"rd":74,"prog":-1},"racingKings":{"games":14,"rating":1407,"rd":125,"prog":-7,"prov":true},"ultraBullet":{"games":239,"rating":1339,"rd":61,"prog":0},"blitz":{"games":697,"rating":1649,"rd":45,"prog":-11},"kingOfTheHill":{"games":63,"rating":1404,"rd":68,"prog":54},"crazyhouse":{"games":57,"rating":1453,"rd":57,"prog":-15},"threeCheck":{"games":29,"rating":1391,"rd":84,"prog":-49},"bullet":{"games":205,"rating":1687,"rd":56,"prog":51},"correspondence":{"games":27,"rating":1185,"rd":99,"prog":-4},"horde":{"games":17,"rating":1441,"rd":103,"prog":129},"puzzle":{"games":235,"rating":1785,"rd":71,"prog":-56},"classical":{"games":16,"rating":1430,"rd":114,"prog":-21,"prov":true},"rapid":{"games":56,"rating":1718,"rd":62,"prog":-27}},"createdAt":1574447492190,"seenAt":1585382894923,"playTime":{"total":299106,"tv":2838},"language":"de-DE","url":"https://lichess.org/@/Theo_Koenig"}\r\n       {"id":"nubo4ka","username":"nubo4ka","online":false,"perfs":{"chess960":{"games":121,"rating":1762,"rd":77,"prog":-31},"puzzle":{"games":728,"rating":2104,"rd":91,"prog":1},"racingKings":{"games":1,"rating":1383,"rd":295,"prog":0,"prov":true},"ultraBullet":{"games":392,"rating":1663,"rd":83,"prog":8},"blitz":{"games":1559,"rating":2085,"rd":45,"prog":7},"kingOfTheHill":{"games":2,"rating":1256,"rd":273,"prog":0,"prov":true},"crazyhouse":{"games":2,"rating":1486,"rd":264,"prog":0,"prov":true},"threeCheck":{"games":149,"rating":1673,"rd":75,"prog":-14},"bullet":{"games":23989,"rating":2007,"rd":45,"prog":-10},"correspondence":{"games":1,"rating":1612,"rd":295,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":47,"rating":1931,"rd":88,"prog":201}},"createdAt":1514645083158,"profile":{"country":"RU"},"seenAt":1585331408075,"playTime":{"total":2932733,"tv":8558},"language":"ru-RU","url":"https://lichess.org/@/nubo4ka"}\r\n       {"id":"pawelzik","username":"Pawelzik","online":false,"perfs":{"blitz":{"games":235,"rating":2195,"rd":45,"prog":13},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":2,"rating":1837,"rd":212,"prog":0,"prov":true}},"createdAt":1584803284832,"profile":{"country":"DE","location":"Köln"},"seenAt":1585257148797,"playTime":{"total":66094,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Pawelzik"}\r\n       {"id":"wolfgangt","username":"WolfgangT","online":false,"perfs":{"blitz":{"games":44,"rating":2210,"rd":54,"prog":60},"bullet":{"games":34,"rating":2200,"rd":61,"prog":51},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584804581252,"profile":{"country":"DE","fideRating":2101},"seenAt":1585341674358,"playTime":{"total":18298,"tv":0},"language":"de-DE","url":"https://lichess.org/@/WolfgangT"}\r\n       {"id":"codeslam","username":"CodeSlam","online":false,"perfs":{"blitz":{"games":327,"rating":2549,"rd":45,"prog":6},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1578831024045,"seenAt":1585339432781,"playTime":{"total":85074,"tv":1673},"language":"en-US","url":"https://lichess.org/@/CodeSlam"}\r\n       {"id":"mawola","username":"Mawola","online":false,"perfs":{"chess960":{"games":98,"rating":1903,"rd":89,"prog":-23},"antichess":{"games":13,"rating":1468,"rd":203,"prog":-16,"prov":true},"atomic":{"games":26,"rating":1650,"rd":144,"prog":-84,"prov":true},"racingKings":{"games":13,"rating":1754,"rd":159,"prog":-2,"prov":true},"ultraBullet":{"games":529,"rating":1836,"rd":59,"prog":-24},"blitz":{"games":1137,"rating":2204,"rd":45,"prog":44},"kingOfTheHill":{"games":2,"rating":1893,"rd":269,"prog":0,"prov":true},"crazyhouse":{"games":391,"rating":1918,"rd":71,"prog":34},"threeCheck":{"games":6,"rating":1503,"rd":211,"prog":0,"prov":true},"bullet":{"games":9265,"rating":2238,"rd":45,"prog":-19},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"horde":{"games":29,"rating":1707,"rd":133,"prog":-57,"prov":true},"puzzle":{"games":366,"rating":2127,"rd":86,"prog":-43},"classical":{"games":21,"rating":2008,"rd":102,"prog":56},"rapid":{"games":107,"rating":2132,"rd":76,"prog":36}},"createdAt":1523393096685,"profile":{"country":"DE","fideRating":2100},"seenAt":1585353303435,"playTime":{"total":1440858,"tv":27206},"language":"de-DE","url":"https://lichess.org/@/Mawola"}\r\n       {"id":"aeromotor","username":"aeromotor","online":false,"perfs":{"blitz":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"puzzle":{"games":55,"rating":1941,"rd":118,"prog":0,"prov":true},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1487355302078,"profile":{"country":"DE","location":"Koeln","firstName":"Gerhard","lastName":"Vetter"},"seenAt":1584983459291,"playTime":{"total":2109,"tv":0},"language":"de-DE","url":"https://lichess.org/@/aeromotor"}\r\n       {"id":"perentie","username":"Perentie","online":false,"perfs":{"chess960":{"games":61,"rating":1473,"rd":76,"prog":-6},"puzzle":{"games":915,"rating":1957,"rd":65,"prog":-63},"blitz":{"games":225,"rating":1679,"rd":48,"prog":30},"crazyhouse":{"games":12,"rating":1592,"rd":120,"prog":68,"prov":true},"bullet":{"games":30,"rating":1489,"rd":80,"prog":-27},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":69,"rating":1813,"rd":101,"prog":97},"rapid":{"games":1738,"rating":1816,"rd":45,"prog":2}},"createdAt":1500321684110,"profile":{"country":"DE","location":"Köln","bio":"I love the Nimzo-Indian, the Najdorf-Sicilian and playing the white side of some sharp Sicilian like a Yugoslav or English attack - or the Sämisch King\'s Indian, which is similar.  The Openings you will never see from me are unsound gambits, where you sacrifice three pawns and I love it to refute them (I\'m a pawngrabber and I love to defend!).  I\'m a big fan of Ben Finegold\'s videos and always think about his rules ;) And - like him - I\'m very impressed by the games of Karpov - they are just sooo beautiful :)"},"seenAt":1585342660367,"playTime":{"total":1625501,"tv":7512},"language":"de-DE","url":"https://lichess.org/@/Perentie"}\r\n       {"id":"harpsinger","username":"Harpsinger","online":false,"perfs":{"blitz":{"games":98,"rating":2328,"rd":45,"prog":-11},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584733272052,"seenAt":1585322126032,"playTime":{"total":28824,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Harpsinger"}\r\n       {"id":"lambinjho","username":"Lambinjho","online":false,"perfs":{"puzzle":{"games":32,"rating":1697,"rd":184,"prog":-14,"prov":true},"blitz":{"games":1132,"rating":2155,"rd":45,"prog":-7},"crazyhouse":{"games":1,"rating":1488,"rd":350,"prog":0,"prov":true},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":9,"rating":2067,"rd":144,"prog":0,"prov":true}},"createdAt":1478442301075,"seenAt":1585347106292,"playTime":{"total":296796,"tv":1609},"language":"de-DE","url":"https://lichess.org/@/Lambinjho"}\r\n       {"id":"to-ro","username":"to-ro","online":false,"perfs":{"blitz":{"games":23,"rating":1921,"rd":93,"prog":118},"puzzle":{"games":972,"rating":2205,"rd":107,"prog":74},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1535908803683,"profile":{"country":"DE","location":"Cologne","firstName":"Torsten","lastName":"Rosenkränzer","fideRating":2029},"seenAt":1585338359834,"playTime":{"total":10796,"tv":0},"language":"de-DE","url":"https://lichess.org/@/to-ro"}\r\n       {"id":"horsti_schmandhoff","username":"Horsti_Schmandhoff","online":false,"perfs":{"blitz":{"games":75,"rating":1939,"rd":81,"prog":83},"puzzle":{"games":254,"rating":2112,"rd":93,"prog":59},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":3,"rating":2120,"rd":232,"prog":0,"prov":true},"classical":{"games":3,"rating":1849,"rd":207,"prog":0,"prov":true},"rapid":{"games":19,"rating":1997,"rd":131,"prog":73,"prov":true}},"createdAt":1541414565775,"seenAt":1584880887615,"playTime":{"total":501533,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Horsti_Schmandhoff"}\r\n       {"id":"girl23","username":"girl23","online":false,"perfs":{"chess960":{"games":3,"rating":1762,"rd":183,"prog":0,"prov":true},"blitz":{"games":558,"rating":1856,"rd":46,"prog":-17},"kingOfTheHill":{"games":25,"rating":1885,"rd":93,"prog":-169},"crazyhouse":{"games":18,"rating":1693,"rd":106,"prog":-17},"bullet":{"games":28,"rating":2044,"rd":100,"prog":33},"correspondence":{"games":46,"rating":1766,"rd":85,"prog":-55},"horde":{"games":1,"rating":1401,"rd":296,"prog":0,"prov":true},"puzzle":{"games":49,"rating":2007,"rd":82,"prog":-10},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":1,"rating":1360,"rd":259,"prog":0,"prov":true}},"createdAt":1563305012105,"seenAt":1585320102538,"playTime":{"total":166066,"tv":2390},"language":"en-US","url":"https://lichess.org/@/girl23"}\r\n       {"id":"unperfekt","username":"unperfekt","online":false,"perfs":{"blitz":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"puzzle":{"games":10,"rating":2217,"rd":124,"prog":0,"prov":true},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584642752490,"seenAt":1585318741138,"playTime":{"total":4062,"tv":0},"language":"de-DE","url":"https://lichess.org/@/unperfekt"}\r\n       {"id":"kaylay","username":"kaylay","online":false,"perfs":{"blitz":{"games":4344,"rating":2162,"rd":45,"prog":-8},"puzzle":{"games":153,"rating":1999,"rd":87,"prog":-66},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":2,"rating":1887,"rd":218,"prog":0,"prov":true}},"createdAt":1529758775744,"profile":{"country":"DE"},"seenAt":1585343784217,"playTime":{"total":1717682,"tv":421},"language":"de-DE","url":"https://lichess.org/@/kaylay"}\r\n       {"id":"abrmakar","username":"ABRMakar","online":false,"perfs":{"chess960":{"games":52,"rating":1757,"rd":62,"prog":1},"antichess":{"games":38,"rating":1508,"rd":82,"prog":47},"atomic":{"games":30,"rating":1767,"rd":95,"prog":39},"racingKings":{"games":3,"rating":1457,"rd":200,"prog":0,"prov":true},"ultraBullet":{"games":246,"rating":1527,"rd":64,"prog":-13},"blitz":{"games":614,"rating":2118,"rd":46,"prog":9},"kingOfTheHill":{"games":10,"rating":1618,"rd":128,"prog":0,"prov":true},"crazyhouse":{"games":82,"rating":1712,"rd":63,"prog":-5},"threeCheck":{"games":20,"rating":1701,"rd":97,"prog":11},"bullet":{"games":521,"rating":1914,"rd":47,"prog":32},"correspondence":{"games":9,"rating":1166,"rd":147,"prog":0,"prov":true},"horde":{"games":9,"rating":1562,"rd":155,"prog":0,"prov":true},"puzzle":{"games":1562,"rating":2068,"rd":66,"prog":-19},"classical":{"games":15,"rating":1984,"rd":115,"prog":49,"prov":true},"rapid":{"games":299,"rating":1917,"rd":48,"prog":-13}},"createdAt":1560428771242,"profile":{"country":"RU","location":"111","firstName":"(⓿_⓿)","lastName":"ЧИКИ БРИКИ","fideRating":2999,"uscfRating":666,"ecfRating":261,"links":"https://www.chess.com/member/makarabrosimov"},"seenAt":1585313654988,"playTime":{"total":498392,"tv":6080},"language":"ru-RU","url":"https://lichess.org/@/ABRMakar"}\r\n       {"id":"donnerhall","username":"Donnerhall","online":false,"perfs":{"blitz":{"games":2262,"rating":2628,"rd":45,"prog":14},"puzzle":{"games":744,"rating":2333,"rd":114,"prog":-38,"prov":true},"bullet":{"games":1634,"rating":2555,"rd":92,"prog":22},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1463955099448,"profile":{"country":"DO","location":"Santo Domingo","bio":"GM Michael Hoffmann","firstName":"Michael","lastName":"Hoffmann","fideRating":2463},"seenAt":1585354850256,"playTime":{"total":1031297,"tv":87950},"language":"de-DE","url":"https://lichess.org/@/Donnerhall"}\r\n       {"id":"honinmyo","username":"honinmyo","online":false,"perfs":{"puzzle":{"games":39,"rating":1970,"rd":123,"prog":-79,"prov":true},"ultraBullet":{"games":1,"rating":1487,"rd":350,"prog":0,"prov":true},"blitz":{"games":5135,"rating":1986,"rd":45,"prog":23},"threeCheck":{"games":1,"rating":1413,"rd":289,"prog":0,"prov":true},"bullet":{"games":147,"rating":1554,"rd":98,"prog":21},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":6,"rating":1991,"rd":188,"prog":0,"prov":true}},"createdAt":1509233651108,"seenAt":1585349744657,"playTime":{"total":1768255,"tv":0},"language":"de-DE","url":"https://lichess.org/@/honinmyo"}\r\n       {"id":"deldragon","username":"deldragon","online":false,"perfs":{"antichess":{"games":1,"rating":1422,"rd":280,"prog":0,"prov":true},"puzzle":{"games":2200,"rating":1833,"rd":76,"prog":36},"atomic":{"games":2,"rating":1291,"rd":239,"prog":0,"prov":true},"blitz":{"games":150,"rating":1470,"rd":65,"prog":39},"crazyhouse":{"games":3,"rating":1358,"rd":221,"prog":0,"prov":true},"bullet":{"games":1,"rating":1353,"rd":259,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":7,"rating":1704,"rd":136,"prog":0,"prov":true},"rapid":{"games":1214,"rating":1724,"rd":45,"prog":-24}},"createdAt":1491689957477,"seenAt":1585359538053,"playTime":{"total":1123567,"tv":39},"language":"es-ES","url":"https://lichess.org/@/deldragon"}\r\n       {"id":"french_connection","username":"French_Connection","online":false,"perfs":{"blitz":{"games":49,"rating":1819,"rd":52,"prog":-14},"puzzle":{"games":85,"rating":2232,"rd":65,"prog":-6},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":10,"rating":1849,"rd":111,"prog":0,"prov":true}},"createdAt":1584569164789,"profile":{"country":"DE","location":"Köln","bio":"never give up"},"seenAt":1585349699660,"playTime":{"total":28773,"tv":0},"language":"de-DE","url":"https://lichess.org/@/French_Connection"}\r\n       {"id":"thorstenc","username":"ThorstenC","online":false,"perfs":{"chess960":{"games":1,"rating":1678,"rd":270,"prog":0,"prov":true},"blitz":{"games":213,"rating":2231,"rd":45,"prog":8},"puzzle":{"games":1081,"rating":2114,"rd":65,"prog":-57},"atomic":{"games":8,"rating":1349,"rd":173,"prog":0,"prov":true},"bullet":{"games":5199,"rating":2169,"rd":45,"prog":8},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":7,"rating":2059,"rd":172,"prog":0,"prov":true}},"createdAt":1536678842459,"profile":{"country":"DE","location":"Köln","bio":"nothing to say here...","firstName":"Thorsten"},"seenAt":1585374995728,"playTime":{"total":1349178,"tv":1051},"language":"de-DE","url":"https://lichess.org/@/ThorstenC"}\r\n       {"id":"n-oa-h","username":"N-OA-H","online":true,"perfs":{"chess960":{"games":9,"rating":1362,"rd":136,"prog":0,"prov":true},"antichess":{"games":23,"rating":1382,"rd":111,"prog":-34,"prov":true},"atomic":{"games":59,"rating":1369,"rd":69,"prog":-26},"racingKings":{"games":14,"rating":1404,"rd":133,"prog":-34,"prov":true},"ultraBullet":{"games":2,"rating":1337,"rd":240,"prog":0,"prov":true},"blitz":{"games":236,"rating":1472,"rd":45,"prog":1},"kingOfTheHill":{"games":2,"rating":1279,"rd":264,"prog":0,"prov":true},"crazyhouse":{"games":15,"rating":1662,"rd":126,"prog":-11,"prov":true},"threeCheck":{"games":41,"rating":1503,"rd":74,"prog":-20},"bullet":{"games":32,"rating":1514,"rd":88,"prog":25},"correspondence":{"games":28,"rating":1272,"rd":86,"prog":69},"horde":{"games":1,"rating":1331,"rd":271,"prog":0,"prov":true},"puzzle":{"games":117,"rating":1980,"rd":78,"prog":-9},"classical":{"games":116,"rating":1622,"rd":48,"prog":18},"rapid":{"games":203,"rating":1502,"rd":46,"prog":1}},"createdAt":1574803049259,"profile":{"firstName":"Noah","fideRating":850},"seenAt":1585382964414,"playTime":{"total":240942,"tv":828},"language":"de-DE","playing":true,"url":"https://lichess.org/@/N-OA-H"}\r\n       {"id":"thursdaynext","username":"THURSDAYNEXT","online":false,"perfs":{"blitz":{"games":5802,"rating":2182,"rd":45,"prog":-18},"puzzle":{"games":296,"rating":1842,"rd":108,"prog":-30},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1509906246784,"seenAt":1585340825097,"playTime":{"total":1325652,"tv":437},"language":"de-DE","url":"https://lichess.org/@/THURSDAYNEXT"}\r\n       {"id":"enpassant2020","username":"Enpassant2020","online":false,"perfs":{"blitz":{"games":149,"rating":1578,"rd":45,"prog":42},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584552761372,"seenAt":1585349176092,"playTime":{"total":56398,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Enpassant2020"}\r\n       {"id":"chessbard1972","username":"Chessbard1972","online":false,"perfs":{"blitz":{"games":842,"rating":2352,"rd":45,"prog":-1},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1578236107991,"seenAt":1585350303988,"playTime":{"total":298275,"tv":600},"language":"de-DE","url":"https://lichess.org/@/Chessbard1972"}\r\n       {"id":"voltaire_1966","username":"Voltaire_1966","online":false,"perfs":{"blitz":{"games":186,"rating":2289,"rd":45,"prog":37},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584389601083,"profile":{"country":"DE","location":"Bochum"},"seenAt":1585346951818,"patron":true,"playTime":{"total":57232,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Voltaire_1966"}\r\n       {"id":"ronrinehart","username":"ronrinehart","online":false,"perfs":{"chess960":{"games":76,"rating":1632,"rd":49,"prog":38},"blitz":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"puzzle":{"games":14,"rating":2053,"rd":107,"prog":1},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":109,"rating":1901,"rd":45,"prog":17},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1581265870803,"profile":{"country":"BZ","firstName":"Ron","lastName":"Rinehart","fideRating":2020,"uscfRating":1750},"seenAt":1585350305625,"playTime":{"total":480898,"tv":5855},"language":"de-DE","url":"https://lichess.org/@/ronrinehart"}\r\n       {"id":"nobibla","username":"nobibla","online":false,"perfs":{"blitz":{"games":594,"rating":2264,"rd":45,"prog":-21},"puzzle":{"games":20,"rating":2177,"rd":91,"prog":85},"bullet":{"games":11,"rating":1927,"rd":104,"prog":0},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584546933072,"seenAt":1585362688872,"playTime":{"total":165246,"tv":0},"language":"de-DE","url":"https://lichess.org/@/nobibla"}\r\n       {"id":"talstyle69","username":"Talstyle69","online":false,"perfs":{"chess960":{"games":34,"rating":1585,"rd":70,"prog":-92},"antichess":{"games":17,"rating":1625,"rd":121,"prog":16,"prov":true},"atomic":{"games":2,"rating":1442,"rd":317,"prog":0,"prov":true},"racingKings":{"games":3,"rating":1618,"rd":262,"prog":0,"prov":true},"ultraBullet":{"games":5,"rating":1340,"rd":183,"prog":0,"prov":true},"blitz":{"games":559,"rating":1922,"rd":45,"prog":32},"kingOfTheHill":{"games":2,"rating":1394,"rd":282,"prog":0,"prov":true},"crazyhouse":{"games":93,"rating":1650,"rd":93,"prog":-91},"threeCheck":{"games":4,"rating":1643,"rd":201,"prog":0,"prov":true},"bullet":{"games":499,"rating":1797,"rd":59,"prog":-20},"correspondence":{"games":4,"rating":1766,"rd":197,"prog":0,"prov":true},"horde":{"games":2,"rating":1359,"rd":262,"prog":0,"prov":true},"puzzle":{"games":20,"rating":2101,"rd":119,"prog":111,"prov":true},"classical":{"games":47,"rating":2214,"rd":104,"prog":28},"rapid":{"games":329,"rating":2095,"rd":67,"prog":24}},"createdAt":1536952673378,"profile":{"bio":"Schach ist das Spiel, das die Verrückten gesund hält","firstName":"St","lastName":"Glaser"},"seenAt":1585342409715,"playTime":{"total":874851,"tv":3690},"language":"de-DE","url":"https://lichess.org/@/Talstyle69"}\r\n       {"id":"jazz-guitar","username":"Jazz-guitar","online":false,"perfs":{"blitz":{"games":20,"rating":1799,"rd":116,"prog":167,"prov":true},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584386581999,"profile":{"country":"DE","location":"Cologne "},"seenAt":1585339004404,"playTime":{"total":6749,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Jazz-guitar"}\r\n       {"id":"hurliburz","username":"Hurliburz","online":false,"perfs":{"chess960":{"games":2,"rating":1792,"rd":223,"prog":0,"prov":true},"blitz":{"games":906,"rating":2180,"rd":45,"prog":4},"puzzle":{"games":894,"rating":2013,"rd":67,"prog":17},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":7,"rating":2229,"rd":137,"prog":0,"prov":true},"rapid":{"games":11,"rating":1998,"rd":147,"prog":0,"prov":true}},"createdAt":1538076656166,"profile":{"country":"DE"},"seenAt":1585342699632,"playTime":{"total":400267,"tv":848},"language":"de-DE","url":"https://lichess.org/@/Hurliburz"}\r\n       {"id":"k_i_n_g_z","username":"k_i_n_g_z","online":false,"perfs":{"blitz":{"games":8,"rating":1656,"rd":149,"prog":0,"prov":true},"puzzle":{"games":206,"rating":1655,"rd":72,"prog":-31},"bullet":{"games":3,"rating":1419,"rd":201,"prog":0,"prov":true},"correspondence":{"games":1,"rating":1885,"rd":284,"prog":0,"prov":true},"classical":{"games":2,"rating":1750,"rd":233,"prog":0,"prov":true},"rapid":{"games":138,"rating":1838,"rd":48,"prog":18}},"createdAt":1540493403342,"seenAt":1585379247946,"playTime":{"total":159244,"tv":0},"language":"en-GB","url":"https://lichess.org/@/k_i_n_g_z"}\r\n       {"id":"minkaski","username":"Minkaski","online":false,"perfs":{"blitz":{"games":2531,"rating":1830,"rd":45,"prog":18},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":3,"rating":1877,"rd":196,"prog":0,"prov":true}},"createdAt":1569529260847,"seenAt":1585160337640,"playTime":{"total":1112907,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Minkaski"}\r\n       {"id":"schnullipulli","username":"schnullipulli","online":false,"perfs":{"blitz":{"games":137,"rating":2101,"rd":45,"prog":-45},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1510321387578,"profile":{"country":"DE","location":"Köln","firstName":"Volker","lastName":"Cramer","links":"www.cityhouse-immobilien.de"},"seenAt":1585254770636,"playTime":{"total":35967,"tv":0},"language":"de-DE","url":"https://lichess.org/@/schnullipulli"}\r\n       {"id":"chrissyplaya","username":"chrissyplaya","online":false,"perfs":{"chess960":{"games":9,"rating":1784,"rd":199,"prog":0,"prov":true},"blitz":{"games":3168,"rating":2298,"rd":45,"prog":-17},"crazyhouse":{"games":81,"rating":1915,"rd":90,"prog":-92},"threeCheck":{"games":158,"rating":2109,"rd":82,"prog":31},"bullet":{"games":913,"rating":2343,"rd":45,"prog":42},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"horde":{"games":5,"rating":1756,"rd":203,"prog":0,"prov":true},"puzzle":{"games":493,"rating":2121,"rd":100,"prog":-149},"classical":{"games":4,"rating":1738,"rd":179,"prog":0,"prov":true},"rapid":{"games":23,"rating":2122,"rd":102,"prog":127}},"createdAt":1462828891224,"profile":{"country":"DE","location":"Niederkassel","bio":"Professional ChessKidsCoach :)","firstName":"Christian","lastName":"Bussard","fideRating":2302},"seenAt":1585373963867,"playTime":{"total":1266054,"tv":35638},"language":"de-DE","title":"FM","url":"https://lichess.org/@/chrissyplaya"}\r\n       {"id":"angstgegner","username":"angstgegner","online":false,"perfs":{"blitz":{"games":2374,"rating":1688,"rd":45,"prog":-21},"puzzle":{"games":810,"rating":1758,"rd":75,"prog":25},"bullet":{"games":13,"rating":1250,"rd":126,"prog":1,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":124,"rating":1845,"rd":101,"prog":62},"rapid":{"games":1072,"rating":1807,"rd":63,"prog":-6}},"createdAt":1455373277434,"profile":{"country":"DE"},"seenAt":1585339770069,"playTime":{"total":1937215,"tv":4069},"language":"de-DE","url":"https://lichess.org/@/angstgegner"}\r\n       {"id":"habuka","username":"Habuka","online":false,"perfs":{"blitz":{"games":98,"rating":2117,"rd":45,"prog":13},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584440172959,"seenAt":1585382989249,"playTime":{"total":37899,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Habuka"}\r\n       {"id":"gun_waif","username":"Gun_Waif","online":false,"perfs":{"blitz":{"games":142,"rating":1407,"rd":68,"prog":-61},"puzzle":{"games":3832,"rating":1618,"rd":63,"prog":-23},"bullet":{"games":1,"rating":1680,"rd":250,"prog":0,"prov":true},"correspondence":{"games":262,"rating":1777,"rd":59,"prog":-24},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":60,"rating":1715,"rd":93,"prog":163}},"createdAt":1530550498777,"profile":{"country":"DE"},"seenAt":1585321907969,"playTime":{"total":126346,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Gun_Waif"}\r\n       {"id":"jodortmund","username":"Jodortmund","online":false,"perfs":{"chess960":{"games":342,"rating":1930,"rd":48,"prog":32},"puzzle":{"games":126,"rating":2138,"rd":68,"prog":-16},"atomic":{"games":5,"rating":1344,"rd":234,"prog":0,"prov":true},"blitz":{"games":345,"rating":2232,"rd":45,"prog":13},"crazyhouse":{"games":5,"rating":1610,"rd":230,"prog":0,"prov":true},"bullet":{"games":659,"rating":2098,"rd":50,"prog":-17},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":5,"rating":2058,"rd":166,"prog":0,"prov":true}},"createdAt":1551009216950,"seenAt":1585304352184,"playTime":{"total":373965,"tv":17527},"language":"de-DE","url":"https://lichess.org/@/Jodortmund"}\r\n       {"id":"uebernaechtigt","username":"uebernaechtigt","online":false,"perfs":{"blitz":{"games":887,"rating":1843,"rd":45,"prog":5},"puzzle":{"games":54,"rating":1968,"rd":88,"prog":-147},"bullet":{"games":1943,"rating":1557,"rd":45,"prog":5},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":13,"rating":1957,"rd":145,"prog":74,"prov":true},"rapid":{"games":9,"rating":1719,"rd":123,"prog":0,"prov":true}},"createdAt":1543001654355,"seenAt":1585267499118,"playTime":{"total":917017,"tv":0},"language":"en-US","url":"https://lichess.org/@/uebernaechtigt"}\r\n       {"id":"rashtao","username":"rashtao","online":false,"perfs":{"chess960":{"games":371,"rating":1694,"rd":67,"prog":26},"antichess":{"games":19,"rating":1212,"rd":254,"prog":-66,"prov":true},"puzzle":{"games":1142,"rating":2069,"rd":69,"prog":-52},"atomic":{"games":8,"rating":1401,"rd":250,"prog":52,"prov":true},"ultraBullet":{"games":3,"rating":1814,"rd":262,"prog":0,"prov":true},"blitz":{"games":7655,"rating":1977,"rd":45,"prog":21},"kingOfTheHill":{"games":6,"rating":1513,"rd":241,"prog":-77,"prov":true},"crazyhouse":{"games":32,"rating":1509,"rd":128,"prog":86,"prov":true},"threeCheck":{"games":1645,"rating":1831,"rd":59,"prog":16},"bullet":{"games":6242,"rating":1862,"rd":49,"prog":-23},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":46,"rating":1961,"rd":113,"prog":17,"prov":true}},"createdAt":1390570443628,"profile":{"country":"DE","location":"Cologne"},"seenAt":1585333832869,"playTime":{"total":3551257,"tv":140388},"language":"de-DE","url":"https://lichess.org/@/rashtao"}\r\n       {"id":"skirschn","username":"skirschn","online":false,"perfs":{"chess960":{"games":1,"rating":1455,"rd":306,"prog":0,"prov":true},"blitz":{"games":1441,"rating":1778,"rd":45,"prog":-24},"puzzle":{"games":1898,"rating":1829,"rd":64,"prog":-27},"ultraBullet":{"games":3,"rating":1185,"rd":218,"prog":0,"prov":true},"bullet":{"games":10809,"rating":1509,"rd":45,"prog":-24},"correspondence":{"games":47,"rating":1847,"rd":91,"prog":-6},"classical":{"games":24,"rating":1863,"rd":127,"prog":-130,"prov":true},"rapid":{"games":230,"rating":1808,"rd":46,"prog":4}},"createdAt":1521015161670,"profile":{"country":"DE","location":"Cologne"},"seenAt":1585311597475,"playTime":{"total":3132691,"tv":223},"language":"de-DE","url":"https://lichess.org/@/skirschn"}\r\n       {"id":"wisibada","username":"wisibada","online":false,"perfs":{"chess960":{"games":20,"rating":2037,"rd":96,"prog":-48},"blitz":{"games":523,"rating":2325,"rd":45,"prog":-4},"puzzle":{"games":30,"rating":2151,"rd":78,"prog":-15},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1529474573985,"profile":{"country":"DE","location":"Köln","firstName":"Bernhard","lastName":"Nagel"},"seenAt":1585261664064,"playTime":{"total":199855,"tv":647},"language":"de-DE","url":"https://lichess.org/@/wisibada"}\r\n       {"id":"lasker-koeln","username":"lasker-koeln","online":false,"perfs":{"blitz":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584373679457,"profile":{"country":"DE","location":"Köln","bio":"https://i.imgur.com/B9LvGMI.png","firstName":"Kölner Schachklub","lastName":"Dr. Lasker"},"seenAt":1585380067388,"playTime":{"total":0,"tv":0},"language":"de-DE","url":"https://lichess.org/@/lasker-koeln"}\r\n       {"id":"jebanis","username":"Jebanis","online":false,"perfs":{"chess960":{"games":37,"rating":1592,"rd":105,"prog":-36},"antichess":{"games":14,"rating":1302,"rd":144,"prog":52,"prov":true},"atomic":{"games":10,"rating":1159,"rd":157,"prog":0,"prov":true},"racingKings":{"games":3,"rating":1361,"rd":203,"prog":0,"prov":true},"ultraBullet":{"games":2419,"rating":1825,"rd":99,"prog":0},"blitz":{"games":2155,"rating":2076,"rd":45,"prog":-12},"kingOfTheHill":{"games":1,"rating":1238,"rd":287,"prog":0,"prov":true},"crazyhouse":{"games":28,"rating":1425,"rd":112,"prog":-11,"prov":true},"threeCheck":{"games":60,"rating":1686,"rd":94,"prog":-12},"bullet":{"games":2449,"rating":2113,"rd":50,"prog":43},"correspondence":{"games":136,"rating":1890,"rd":83,"prog":-13},"horde":{"games":2,"rating":1388,"rd":265,"prog":0,"prov":true},"puzzle":{"games":657,"rating":1928,"rd":79,"prog":-53},"classical":{"games":35,"rating":2012,"rd":98,"prog":3},"rapid":{"games":78,"rating":1997,"rd":97,"prog":39}},"createdAt":1448229934324,"profile":{"country":"DE","location":"Cologne"},"seenAt":1585382066747,"patron":true,"playTime":{"total":2413134,"tv":32399},"language":"de-DE","url":"https://lichess.org/@/Jebanis"}\r\n       {"id":"ofey-michaeld","username":"Ofey-MichaelD","online":false,"perfs":{"blitz":{"games":38,"rating":2107,"rd":67,"prog":0},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584369255852,"seenAt":1585343460556,"playTime":{"total":12704,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Ofey-MichaelD"}\r\n       {"id":"koeln93","username":"Koeln93","online":false,"perfs":{"blitz":{"games":26,"rating":1232,"rd":109,"prog":43},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1584371225821,"seenAt":1584985473686,"playTime":{"total":8309,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Koeln93"}\r\n       {"id":"vandyne","username":"vandyne","online":true,"perfs":{"blitz":{"games":388,"rating":2093,"rd":45,"prog":5},"puzzle":{"games":1,"rating":1711,"rd":276,"prog":0,"prov":true},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1535276629858,"profile":{"country":"DE","location":"Köln"},"seenAt":1585382901735,"playTime":{"total":129045,"tv":0},"language":"de-DE","playing":true,"url":"https://lichess.org/@/vandyne"}\r\n       {"id":"thefrench99","username":"TheFrench99","online":false,"perfs":{"blitz":{"games":10,"rating":2028,"rd":108,"prog":0},"puzzle":{"games":155,"rating":2180,"rd":96,"prog":5},"bullet":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1540120154669,"profile":{"country":"DE","location":"Frechen","firstName":"Michael","lastName":"Paris"},"seenAt":1585376881898,"playTime":{"total":4152,"tv":0},"language":"de-DE","url":"https://lichess.org/@/TheFrench99"}\r\n       {"id":"digitalizer","username":"Digitalizer","online":false,"perfs":{"blitz":{"games":1102,"rating":2158,"rd":45,"prog":2},"puzzle":{"games":1200,"rating":2143,"rd":66,"prog":-30},"bullet":{"games":4409,"rating":2048,"rd":45,"prog":-9},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1535906645523,"seenAt":1585382705704,"playTime":{"total":1629735,"tv":309},"language":"de-DE","url":"https://lichess.org/@/Digitalizer"}\r\n       {"id":"nadeesh","username":"Nadeesh","online":false,"perfs":{"blitz":{"games":332,"rating":2202,"rd":45,"prog":-4},"puzzle":{"games":288,"rating":2310,"rd":78,"prog":61},"bullet":{"games":67,"rating":1972,"rd":60,"prog":36},"correspondence":{"games":100,"rating":2257,"rd":71,"prog":-43},"classical":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"rapid":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true}},"createdAt":1537722530623,"profile":{"country":"DE","location":"Köln","bio":"https://i.imgur.com/tDj7mFs.jpg","firstName":"Nadeesh","lastName":"Lindam","fideRating":2139},"seenAt":1585350530438,"playTime":{"total":131919,"tv":0},"language":"de-DE","url":"https://lichess.org/@/Nadeesh"}\r\n       {"id":"bobshepard","username":"bobshepard","online":false,"perfs":{"chess960":{"games":574,"rating":1660,"rd":105,"prog":-25},"antichess":{"games":1,"rating":1361,"rd":321,"prog":0,"prov":true},"ultraBullet":{"games":1,"rating":1456,"rd":346,"prog":0,"prov":true},"blitz":{"games":10496,"rating":1931,"rd":45,"prog":10},"kingOfTheHill":{"games":1,"rating":1446,"rd":350,"prog":0,"prov":true},"crazyhouse":{"games":52,"rating":1835,"rd":191,"prog":37,"prov":true},"threeCheck":{"games":24,"rating":1647,"rd":194,"prog":74,"prov":true},"bullet":{"games":1172,"rating":1809,"rd":63,"prog":-5},"correspondence":{"games":0,"rating":1500,"rd":350,"prog":0,"prov":true},"horde":{"games":3,"rating":1262,"rd":289,"prog":0,"prov":true},"puzzle":{"games":1203,"rating":1967,"rd":86,"prog":51},"classical":{"games":14,"rating":1963,"rd":126,"prog":-34,"prov":true},"rapid":{"games":204,"rating":1894,"rd":118,"prog":-54,"prov":true}},"createdAt":1433367068981,"seenAt":1585310186397,"playTime":{"total":4945967,"tv":48797},"language":"en-GB","url":"https://lichess.org/@/bobshepard"}\r\n';
var $author$project$Main$decodeUsers = function () {
	var userList = A2($elm$core$String$split, '\n', $author$project$Data$usersData);
	return $elm$core$List$reverse(
		A2(
			$elm$core$List$sortBy,
			function (user) {
				return user.blitzRating;
			},
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				A2(
					$elm$core$List$map,
					function (result) {
						if (result.$ === 'Err') {
							return $elm$core$Maybe$Nothing;
						} else {
							var value = result.a;
							return $elm$core$Maybe$Just(value);
						}
					},
					A2(
						$elm$core$List$map,
						function (user) {
							return A2($elm$json$Json$Decode$decodeString, $author$project$Main$teamMemberDecoder, user);
						},
						userList)))));
}();
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2(
		{fetchState: $author$project$Main$Success, users: $author$project$Main$decodeUsers},
		$elm$core$Platform$Cmd$none);
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Main$Failure = function (a) {
	return {$: 'Failure', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $author$project$Main$sortBy = F3(
	function (sortOrder, index, users) {
		var sort = function () {
			switch (index) {
				case 0:
					return $elm$core$List$sortBy(
						function (u) {
							return u.username;
						});
				case 1:
					return $elm$core$List$sortBy(
						function (u) {
							return u.blitzRating;
						});
				default:
					return $elm$core$List$sortBy(
						function (u) {
							return u.username;
						});
			}
		}();
		if (sortOrder.$ === 'Asc') {
			return sort(users);
		} else {
			return $elm$core$List$reverse(
				sort(users));
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Load':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{fetchState: $author$project$Main$Success, users: $author$project$Main$decodeUsers}),
					$elm$core$Platform$Cmd$none);
			case 'Sort':
				var sortOrder = msg.a;
				var columnIndex = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							users: A3($author$project$Main$sortBy, sortOrder, columnIndex, model.users)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var result = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							fetchState: $author$project$Main$Failure($elm$http$Http$NetworkError),
							users: _List_Nil
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$Asc = {$: 'Asc'};
var $author$project$Main$Desc = {$: 'Desc'};
var $author$project$Main$Load = {$: 'Load'};
var $author$project$Main$Sort = F2(
	function (a, b) {
		return {$: 'Sort', a: a, b: b};
	});
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$td = _VirtualDom_node('td');
var $author$project$Main$teamUrl = 'https://lichess.org/api/team/ksk-dr-lasker-1861-ev/users';
var $elm$html$Html$th = _VirtualDom_node('th');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $author$project$Main$userBlitzRatingAverage = function (users) {
	return (A3(
		$elm$core$List$foldl,
		F2(
			function (user, sum) {
				return sum + user.blitzRating;
			}),
		0,
		users) / $elm$core$List$length(users)) | 0;
};
var $author$project$Main$viewTeamData = function (model) {
	var _v0 = model.fetchState;
	switch (_v0.$) {
		case 'Failure':
			var err = _v0.a;
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Could not load data from ' + $author$project$Main$teamUrl),
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								function () {
								if (err.$ === 'NetworkError') {
									return $elm$html$Html$text('ERROR! network error ');
								} else {
									return $elm$html$Html$text('ERROR! other error');
								}
							}()
							])),
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Main$Load)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Reload')
									]))
							]))
					]));
		case 'Loading':
			return $elm$html$Html$text('Loading ...');
		default:
			return A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Events$onClick($author$project$Main$Load)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Reload')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$table,
								_List_Nil,
								A2(
									$elm$core$List$cons,
									A2(
										$elm$html$Html$tr,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'font-size', '20px')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$th,
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$style, 'vertical-align', 'bottom')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'font-size', '14px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																'total: ' + $elm$core$String$fromInt(
																	$elm$core$List$length(model.users)))
															])),
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text('Number')
															]))
													])),
												A2(
												$elm$html$Html$th,
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$style, 'vertical-align', 'bottom')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'font-size', '14px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('')
															])),
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text('User name '),
																A2(
																$elm$html$Html$button,
																_List_fromArray(
																	[
																		$elm$html$Html$Events$onClick(
																		A2($author$project$Main$Sort, $author$project$Main$Asc, 0))
																	]),
																_List_fromArray(
																	[
																		$elm$html$Html$text('🡅')
																	])),
																A2(
																$elm$html$Html$button,
																_List_fromArray(
																	[
																		$elm$html$Html$Events$onClick(
																		A2($author$project$Main$Sort, $author$project$Main$Desc, 0))
																	]),
																_List_fromArray(
																	[
																		$elm$html$Html$text('🡇')
																	]))
															]))
													])),
												A2(
												$elm$html$Html$th,
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$style, 'vertical-align', 'bottom')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'font-size', '14px')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																'⌀: ' + $elm$core$String$fromInt(
																	$author$project$Main$userBlitzRatingAverage(model.users)))
															])),
														A2(
														$elm$html$Html$div,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text('Blitz rating '),
																A2(
																$elm$html$Html$button,
																_List_fromArray(
																	[
																		A2($elm$html$Html$Attributes$style, 'font-weight', 'bold'),
																		$elm$html$Html$Events$onClick(
																		A2($author$project$Main$Sort, $author$project$Main$Asc, 1))
																	]),
																_List_fromArray(
																	[
																		$elm$html$Html$text('🡅')
																	])),
																A2(
																$elm$html$Html$button,
																_List_fromArray(
																	[
																		$elm$html$Html$Events$onClick(
																		A2($author$project$Main$Sort, $author$project$Main$Desc, 1))
																	]),
																_List_fromArray(
																	[
																		$elm$html$Html$text('🡇')
																	]))
															]))
													]))
											])),
									A2(
										$elm$core$List$indexedMap,
										F2(
											function (i, user) {
												return A2(
													$elm$html$Html$tr,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$elm$html$Html$td,
															_List_Nil,
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	$elm$core$String$fromInt(i + 1))
																])),
															A2(
															$elm$html$Html$td,
															_List_Nil,
															_List_fromArray(
																[
																	$elm$html$Html$text(user.username)
																])),
															A2(
															$elm$html$Html$td,
															_List_Nil,
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	$elm$core$String$fromInt(user.blitzRating))
																]))
														]));
											}),
										model.users)))
							]))
					]));
	}
};
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Lasker Team Data')
					])),
				$author$project$Main$viewTeamData(model)
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));
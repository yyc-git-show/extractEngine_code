﻿/***********************************************
 Javascript OOP框架YOOP    v1.1

 author：YYC
 date：2013-06-09
 email：395976266@qq.com
 qq: 395976266
 blog：http://www.cnblogs.com/chaogex/


 修改记录：
 2012.10.23：
 实现面向对象的写法（抽象类、接口、私有、公有、静态）

 2012.11.24：
 该框架的好处是用属性、方法之间可以用this互相调用。

 缺点就是外界可以访问到私有属性/方法、保护属性/方法。





 Private：私有属性/方法
 Public：公有属性/方法
 Protected: 保护属性/方法
 Virtual : 虚方法（公有虚方法）（虚方法可以不被重写，虚方法只能在Public或Protected中声明）
 Abstract: 抽象成员
 Static：静态属性/方法

 访问私有或公有属性/方法的方法：都用this来调用。


 2012.12.04：
 //私有属性/方法以“_”开头，保护属性/方法以“P_”开头。



 基类的私有成员以“_”开头，  //保护成员以“P_”开头，
 第一层子类私有成员以“__”开头，   //保护成员以“P__”开头，
 第二层子类私有成员以“___”开头，  //保护成员以“P___”开头，
 以此类推。。。。。。（接口不算。即如果类A实现接口I，则A的私有成员以“_”开头）
 这样做的目的是继承树上的各层类的私有成员互不干涉  //和保护成员互不干涉。

 注意：如果基类为接口，则接口不作为此处的基类（它的子类作为基类进行判断）；
 //如果基类为抽象类且该抽象类没有私有成员，则抽象类不作为此处的基类（它的子类作为基类进行判断），否则抽象类作为此处的基类（即私有成员以“_”开头）。



 父类中，不希望被子类重写的成员，放到Sealed中，
 如果公有成员被其它成员调用，且该公有成员不在Sealed中且不希望被子类多态，则使用纯虚原则先将其写成私有方法，再其它成员调用私有方法。
 如：
 Operate_Game.js Operate_Single类中的RefreshMapInfo、GameOver等公有成员。

 如果公有成员被其它成员调用，且该公有成员希望被子类多态（子类同名方法用this.base调用父类同名方法，父类同名方法又调用了该公有成员。
 该公有成员被子类覆盖了，所以父类同名方法实际上调用的是子类中与该公有成员同名的成员），则不做任何处理，其它成员直接调用该公有成员。
 如：
 Operate_Game.js Operate_Single类中AddTimeLine、Mousedown等。

 子类（Operate_Boss）的start方法中通过this.base（this.base的作用是将父类的同名方法指向子类）调用父类的start方法，
 父类的start方法又调用了公有成员AddTimeLine。而该AddTimeLine被子类的同名方法AddTimeLine覆盖了，所以父类的start方法实际调用的是子类的AddTimeLine。

 Mousedown同理。




 子类调用父类方法都用this.base()/this.baseClass.xxx.call(this, xxx)。因为这样都统一调用子类的原型链。
 如果用this.baseToParrent()/this.baseClass.xxx()，这样就是调用父类的原型链了，可能会造成子类原型和父类原型混乱的情况（如有些子类方法用this.base()
 （希望调用子类多态同名方法时），有些子类方法用this.baseToParrent()）。



 //子类多态：子类同名方法中调用父类的同名方法（如通过this.baseToParrent()/this.baseClase.xxx/this.base等），父类的同名方法又包括了父类中的公有成员。


 2013.02.20：
 现在每次创建Class的类的实例时，原型保持不变（即时第一次创建实例后修改了原型）。

 2013.03.31:
 //修改了extendDeep（新名字为extendDeep）。
 改用extendDeep（不再调用hasOwnProperty判断，因为调用的话，就不能备份父类原型上的成员了！）。
 增加命名空间。


 2013.04.02:
 “_extendDeep(F.prototype.backUp_prototype, F.prototype);”顺序错了，
 应该为“_extendDeep(F.prototype, F.prototype.backUp_prototype);”或“F.prototype.backUp_prototype = _extendDeep(F.prototype);”。
 已修正该顺序！


 2013.04.12:
 之前的顺序是对的。。。。。。（04.02）
 恢复了原来的顺序：“_extendDeep(F.prototype.backUp_prototype, F.prototype);”


 2013.04.14:
 AClass中也增加了backUp_prototype机制：
 现在修改抽象类的子类的实例中继承的抽象类的属性后，
 创建抽象类的实例（或者新建个空类并继承抽象类，然后创建该空类的实例）（在测试抽象类时，会需要创建抽象类的实例），
 该实例的属性会恢复为原始状态。


 2013.04.21:
 AClass中也能写Init构造函数了（供子类构造函数中调用）。
 在Class类的Init构造函数中，可以通过this.baseToParrent/this.base来调用父类的构造函数了（以前在Init中只能通过this.baseClass.Init来调用！）。


 2013.04.22:
 修复了bug。详见《YOOP记录》 -> 已解决的问题1、2。

 2013.05.13:
 修复了bug。详见《YOOP记录》 -> 已解决的问题3、4。
 注意！多级继承时，一级子类通过baseClass调用父类原型，二级子类通过_baseClass调用一级子类原型，以此类推。


 2013.05.31:
 将YYC.Frame.MyClass改为YYC.Class
 将YYC.Frame.MyAbstract改为YYC.AClass
 将YYC.Frame.MyInterface改为YYC.Interface

 将原来的base改名为baseToParrent并弃用（注释掉），将baseToSubClass改名为base 。

 去掉多余的注释。

 2013.06.01
 使用面向过程的思想重构了代码结构。

 2013.06.02 - 2013.06.03
 去掉了“密封方法”、“baseToParent”。
 使用面向对象的思想重构了代码结构。


 2013.06.05
 增加YOOPSpec -> 测试"子类虚方法实现抽象父类的抽象方法时，不抛出异常"、"非抽象类定义抽象成员时抛出异常"。

 将children改名为impletationMap。
 增加P_addToImpletationMap。
 将P_prepareAndAddProtected、P_prepareAndAddPublic、P_addVirtual中“将实现方法加入到ImpletationMap中”的职责提取出来形成P_prepareCheck方法，并将原方法改名为P_addPublicMember、P_addProtectedMember。
 将Structure -> P_check分解为P_checkImplementationOfAbstract、P_checkImplementationOfInterface。

 将P_addPrivate、P_addStatic改名为P_addPrivateMember、P_addStaticMember。

 将buildClass、buildAClass中的addOuterAbstract职责提取为_addOuterAbstract方法。
 将buildClass中的备份F.prototype提取为_backUpPrototype方法。

 将F中的恢复F.prototype和初始化分别提取为_copyPrototypeToInstance、_init方法。

 解决了“非抽象类定义抽象成员时不抛出异常”的bug：
 在Class -> P_addSpecial中判断是否有Abstract，如果有则抛出异常。

 将Structure的实例属性下移到子类中。

 修改了_addVirtualToImplementMap。

 将Structure写成原型形式，而Interface、AClass、Class不写成原型形式！

 采用我的编程规范，将AClass、Class的私有函数前缀写成“__”(两个下划线)。


 2013.06.06
 重构了P_checkImplementationOfAbstract、P_checkImplementationOfInterface。

 重构了AClass -> _getByParent

 去掉YOOP多余的注释。

 2013.06.07

 YYC.AClass、YYC.Class增加“可以将虚方法定义在外面，表示公有虚方法”

 YYC.AClass不验证是否实现了接口，但是可以继承接口成员（可以交给子类Class来验证）。

 YYC.Interface、YYC.AClass、YYC.Class可以继承多个接口。

 修改了buildClass、buildAClass、__getByParent传入的参数。

 完善YOOPSpec测试。

 发布了YOOP v1.0

 2013.06.08

 修复“抽象类A继承接口I但不实现，交给子类B实现。框架会检查子类是否实现了父类A的所有成员！”的bug：
 P_checkImplementationOfInterface中增加判断：如果为接口成员才进行检查实现。

 oopFrame.js改名为YOOP.js

 2013.06.09
 删除不必要的注释。


 2013.06.30
 将严格模式下的保留字interface替换为_interface。

 v1.0版本

 2014.01.12
 修改了YOOPSpec.js->“解决“若父类的属性为引用类型（数组或对象）a，则如果子类的实例s1对a进行修改或者sub调用修改a的方法，则第二次创建实例s2的a为修改过后的a！"测试。
 现在不再通过备份和还原原型来解决该问题了，而是通过”Class的构造函数中（F）将原型深拷贝到实例中“来解决该问题


 2014.01.17
 _restorePrototype重命名为_copyPrototypeToInstance

 2014.02.07
 类实例增加isInstanceof方法，用于判断是否为类的实例，适用于接口继承、类继承等情况
 将AClass、Class的继承方式由“深拷贝父类原型成员到子类原型”改为“子类原型=父类实例”

 2014.02.08
 将isInstanceof重命名为isInstanceOf
 保护成员前缀都为“P_”，不需要根据继承层级的不同，设置为“P__”、“P___”了！
 （因为我现在认为保护成员是可以被子类重写的，如果是不希望被子类重写（如引擎类的保护成员不希望被继承该类的用户类的保护成员重写），则可以加上特有前缀（如引擎类中加上“ye_”））

 2014.02.11
 恢复继承方式为extendDeep


 2014.02.27
 更改方法的前缀，将“__”改为“_”

 2014.03.13
 protected方法也可以使用this.base来访问父类同名方法了

 2014.03.14
 解决了“若一个方法中调用其它方法，则它们的this.base会互相干扰”的问题，详见《YOOP记录》->已解决的问题

 2014.04.24
 增加stubParentMethod方法。该方法让父类指定方法不执行，用于Class的测试方法中调用了父类方法的情况（如调用了this.base()或this.baseClass.xxx）

 2014.05.09
 增加stubParentMethodByAClass方法。该方法用于AClass的测试方法中调用父类方法的情况

 2014.05.17
 修改stubParentMethod、stubParentMethodByAClass方法

 2014.07.16
 支持AMD、CMD、CommonJS规范，支持通过script标签直接引用（引入命名空间YYC）
 在seajs、nodejs和直接引用script中运行测试通过

 2014.08.26
 增加YOOP.version属性（YYC.YOOP.version），获得当前版本号。
 F中只拷贝原型的属性到实例中，所有实例共享原型的方法。（_copyPrototypeToInstance改为_copyProtoAttrToInstance）

 版本升级为v1.1，更新博文，上传到GitHub中

 2014.08.30
 现在可以申明虚属性了

 ************************************************/
(function () {
    var version = "1.1";
    var global = this,
        YOOP = {};

    //js对象扩展
    (function () {
        String.prototype.contain = function (str) {
            var reg = new RegExp(str);  //str需要转义
            if (this.match(reg)) {
                return true;
            }
            else {
                return false;
            }
        }
    }());

    //获得在原型prototype中不存在同名的str。
    //如果有同名，则加上前缀"_"
    function _getNoRepeatStrInPrototype(prototype, str) {
        var new_str = "";

        if (!prototype[str]) {
            return str;
        }
        new_str = "_" + str;

        return arguments.callee(prototype, new_str);
    }

    function _extendDeep(parent, child) {
        var i = null,
            len = 0,
            toStr = Object.prototype.toString,
            sArr = "[object Array]",
            sOb = "[object Object]",
            type = "",
            _child = null;

        //数组的话，不获得Array原型上的成员。
        if (toStr.call(parent) === sArr) {
            _child = child || [];

            for (i = 0, len = parent.length; i < len; i++) {
                type = toStr.call(parent[i]);
                if (type === sArr || type === sOb) {    //如果为数组或object对象
                    _child[i] = type === sArr ? [] : {};
                    arguments.callee(parent[i], _child[i]);
                }
                else {
                    _child[i] = parent[i];
                }
            }
        }
        //对象的话，要获得原型链上的成员。因为考虑以下情景：
        //类A继承于类B，现在想要拷贝类A的实例a的成员（包括从类B继承来的成员），那么就需要获得原型链上的成员。
        else if (toStr.call(parent) === sOb) {
            _child = child || {};

            for (i in parent) {
                if (i.contain("baseClass")) {
                    _child[i] = parent[i];
                    continue;
                }

                type = toStr.call(parent[i]);
                if (type === sArr || type === sOb) {
                    _child[i] = type === sArr ? [] : {};
                    arguments.callee(parent[i], _child[i]);
                }
                else {
                    _child[i] = parent[i];
                }
            }
        }
        else {
            _child = parent;
        }

        return _child;
    }

    function _extend(destination, source) {
        var property = "";

        for (property in source) {
            destination[property] = source[property];
        }
        return destination;
    }

    function _getFunctionName(fn) {
        var name = "";

        if (!fn) {
            return null;
        }

        name = fn.toString().match(/^.*function\s*([^\(]*)/);
        return name === null ? name : name[1];
    }

    function _isArray(val) {
        return Object.prototype.toString.call(val) === "[object Array]";
    }

    function _initParentContainer(struct) {
        struct.yoop_parents = []
    }

    function _saveParents(struct, inheritedInterfaces, inheritedClasses) {
        if (inheritedInterfaces) {
            struct.yoop_parents = struct.yoop_parents.concat(inheritedInterfaces);
            for (var i = 0, len = inheritedInterfaces.length; i < len; i++) {
                struct.yoop_parents = struct.yoop_parents.concat(inheritedInterfaces[i].yoop_parents);
            }
        }

        if (inheritedClasses) {
            struct.yoop_parents.push(inheritedClasses);
            struct.yoop_parents = struct.yoop_parents.concat(inheritedClasses.yoop_parents);
        }
    }

    /*
     Structure写成原型形式，而Interface、AClass、Class不写成原型形式！（如写成:
     Interface.prototype = (function(){
     function I(){
     };

     return {
     ...
     };
     }());
     ）
     因为如果写成原型形式，则Interface/AClass/Class的实例就共享同一个I/A/F类！这样会造成不同的类之间互相干扰！
     */
    (function () {
        function Interface() {
            var that = this;

            this.parent = null;
            this.method = null;
            this.attribute = null;

            _initParentContainer(I);

            function I() {
            }

            function _getByParent(_parent, _method, _attribute) {
                if (_hasParent(_parent)) {
                    _checkInheritInterface(_parent);
                    that.parent = _isArray(_parent) ? _parent : [_parent];

                    //形如“Interface(Parent, "A", "B", "GetName");”
                    if (_method && !_isArray(_method)) {
                        that.method = Array.prototype.slice.call(arguments, 1);
                        that.attribute = null;
                    }
                    //形如“Interface(Parent, ["A", "B", "GetName"], ["a", "c"]);”
                    else {
                        that.method = _method;
                        that.attribute = _attribute;
                    }
                }
                else {
                    that.parent = null;
                    //形如“Interface("A", "B", "GetName");”
                    if (_parent && !_isArray(_parent)) {
                        that.method = Array.prototype.slice.call(arguments, 0);
                        that.attribute = null;
                    }
                    //形如“Interface(["A", "B", "GetName"], ["a", "c"]);”
                    else {
                        that.method = arguments[0];
                        that.attribute = arguments[1];
                    }
                }

                _saveParents(I, that.parent);
                _checkMethod();
            };
            function _hasParent(_parent) {
                return typeof _parent === "function" || (_isArray(_parent) && typeof _parent[0] === "function");
            };
            function _checkInheritInterface(_parent) {
                var i = 0,
                    len = 0;

                for (i = 0, len = _parent.length; i < len; i++) {
                    if (_getFunctionName(_parent[i]) !== "I") {
                        throw new Error("Interface must inherit interface!");
                    }
                }
            };
            function _checkMethod() {
                if (!that.method) {
                    throw new Error("Interface must has methods");
                }
            };
            function _inherit() {
                var i = 0,
                    len = 0;

                for (i = 0, len = that.parent.length; i < len; i++) {
                    _extendDeep(that.parent[i].prototype, I.prototype);
                }
                I.prototype.constructor = I;
            };
            function _addMethod() {
                var i = 0,
                    len = 0;

                for (i = 0, len = that.method.length; i < len; i++) {
                    if (that.method[i] === undefined) {
                        continue;
                    }
                    //加上前缀“Interface_”
                    I.prototype["Interface_" + that.method[i]] = function () {
                        throw new Error("This method must be overwrited!");
                    };
                }
            };
            function _addAttribute() {
                var i = 0,
                    len = 0;

                if (that.attribute) {
                    if (!_isArray(that.attribute)) {
                        throw new Error("Attribute must be array!");
                    }
                    else {
                        for (i = 0, len = that.method.length; i < len; i++) {
                            //加上前缀“Interface_”
                            I.prototype["Interface_" + that.attribute[i]] = 0;
                        }
                    }
                }
            };

            this.buildInterface = function (_parent, _method, _attribute) {
                _getByParent(_parent, _method, _attribute);
                if (this.parent) {
                    _inherit();
                }
                _addMethod();
                _addAttribute();

                return I;
            };
        };

        YOOP.Interface = function (_parent, _method, _attribute) {
            return new Interface().buildInterface(_parent, _method, _attribute);
        };
    }());

    (function () {

        function Structure() {
        };
        Structure.prototype = (function () {
            return {
                _addMemberAndSetBaseFunc: function (name, position) {
                    var parentClass = this.parentClass,
                        prop = this.prop,
                        P_class = this.P_class,
                        backup = null;

                    if (parentClass &&
                        typeof prop[position][name] === "function" &&
                        typeof P_class.prototype[name] === "function") {
                        P_class.prototype[name] = function (name) {
                            return function () {
                                backup = this.base;
                                this.base = parentClass.prototype[name];

                                return (function (backup, self, args, name) {
                                    var result = prop[position][name].apply(self, args);
                                    self.base = backup;
                                    return result;
                                }(backup, this, arguments, name))

                            };
                        }(name);
                    }
                    else {
                        P_class.prototype[name] = prop[position][name];
                    }
                },
                _addToImplementMap: function (name, func) {
                    this.implementaionMap[name] = func;
                },
                _prepareCheckFor: function (module) {
                    var name = null;

                    if (module) {
                        for (name in module) {
                            if (module.hasOwnProperty(name)) {
                                this._prepareCheckForSpecial(name, module);
                                this._addToImplementMap(name, module[name]);
                            }
                        }
                    }
                },
                _prepareCheckForSpecial: function (name, module) {
                    this._addVirtualToImplementMap(name, module);
                },
                _addVirtualToImplementMap: function (name, module) {
                    var name2 = "";

                    if (name === "Virtual") {
                        for (name2 in module[name]) {
                            if (module[name].hasOwnProperty(name2)) {
                                this._addToImplementMap(name2, module[name][name2]);
                            }
                        }
                    }
                },
                P_checkImplementationOfAbstract: function () {
                    var name = "",
                        parentClass = this.parentClass;

                    if (this.parentClass) {
                        for (name in parentClass.prototype) {
                            if (name === "constructor") {
                                continue;
                            }
                            if (name.contain("Abstract_")) {
                                if (typeof parentClass.prototype[name] === "function") {
                                    this._checkAbstractMethod(name);
                                }
                                else {
                                    this._checkAbstractAttribute(name);
                                }
                            }
                        }
                    }
                },
                _checkAbstractMethod: function (name) {
                    var parentClass = this.parentClass,
                        implementaionMap = this.implementaionMap;

                    if (this._noMethodForAbstract(implementaionMap, name) && this._noMethodForAbstract(parentClass.prototype, name)) {
                        throw new Error("Abstract method '" + name + "' must be overwrited!");
                    }
                },
                _checkAbstractAttribute: function (name) {
                    var parentClass = this.parentClass,
                        implementaionMap = this.implementaionMap;

                    if (this._noAttritubeForAbstract(implementaionMap, name) && this._noAttritubeForAbstract(parentClass.prototype, name)) {
                        throw new Error("Abstract attribute '" + name + "' must be overwrited!");
                    }
                },
                P_checkImplementationOfInterface: function (_interface) {
                    var name = "";

                    for (name in _interface.prototype) {
                        if (!name.contain("Interface_")) {
                            continue;
                        }
                        if (typeof _interface.prototype[name] === "function") {
                            this._checkInterfaceMethod(name);
                        }
                        else {
                            this._checkInterfaceAttribute(name);
                        }
                    }
                },
                _checkInterfaceMethod: function (name) {
                    var implementaionMap = this.implementaionMap,
                        parentClassPrototype = this.parentClass ? this.parentClass.prototype : {};

                    if (this._noMethodForInterface(implementaionMap, name) && this._noMethodForInterface(parentClassPrototype, name)) {
                        throw new Error("Interface method '" + name + "' must be overwrited!");
                    }
                },
                _checkInterfaceAttribute: function (name) {
                    var implementaionMap = this.implementaionMap,
                        parentClassPrototype = this.parentClass ? this.parentClass.prototype : {};

                    if (this._noAttritubeForInterface(implementaionMap, name) && this._noAttritubeForInterface(parentClassPrototype, name)) {
                        throw new Error("Interface attribute '" + name + "' must be overwrited!");
                    }
                },
                _noMethodForAbstract: function (_class, name) {
                    return _class[name.slice(9)] === undefined || typeof _class[name.slice(9)] !== "function";
                },
                _noAttritubeForAbstract: function (_class, name) {
                    return _class[name.slice(9)] === undefined || typeof _class[name.slice(9)] === "function";
                },
                _noMethodForInterface: function (_class, name) {
                    return _class[name.slice(10)] === undefined || typeof _class[name.slice(10)] !== "function";
                },
                _noAttritubeForInterface: function (_class, name) {
                    return _class[name.slice(10)] === undefined || typeof _class[name.slice(10)] === "function";
                },
                P_addAbstract: function (abstract) {
                    var name = "",
                        _class = this.P_class;

                    for (name in abstract) {
                        if (abstract.hasOwnProperty(name)) {
                            //抽象方法前面加"Abstract_"前缀
                            _class.prototype["Abstract_" + name] = abstract[name];
                        }
                    }
                },
                //加入虚方法(不能为虚属性)
                P_addVirtualAndCheck: function (virtual) {
                    var name = "",
                        _class = this.P_class;

                    for (name in virtual) {
                        if (virtual.hasOwnProperty(name)) {
//                            if (typeof virtual[name] !== "function") {
//                                throw new Error("Virtual attribute is not allowed!");
//                            }
//                            else {
                            _class.prototype[name] = virtual[name];
//                            }
                        }
                    }
                },
                P_addStaticMember: function () {
                    var Static = null,
                        k = null,
                        _class = this.P_class,
                        prop = this.prop;

                    Static = prop.Static ? prop.Static : null;

                    for (k in Static) {
                        _class[k] = Static[k];
                    }
                },
                P_inherit: function () {
                    var _class = this.P_class,
                        parentClass = this.parentClass;

                    if (parentClass) {
                        _class.prototype = _extendDeep(parentClass.prototype);
                        _class.prototype.constructor = _class;
                        // 如果父类存在，则实例对象的baseClass指向父类的原型。
                        // 这就提供了在实例对象中调用父类方法的途径。
                        // 注意：baseClass的方法是指向this.parentClass.prototype的，不是指向（子类）的！
                        _class.prototype[_getNoRepeatStrInPrototype(parentClass.prototype, "baseClass")] = parentClass.prototype;
                    }
                },
                P_addInit: function () {
                    var _class = this.P_class,
                        parentClass = this.parentClass,
                        prop = this.prop;

                    if (prop.Init) {
                        if (parentClass &&
                            typeof prop.Init === "function" &&
                            typeof _class.prototype.Init === "function") {
                            _class.prototype.Init = function (name) {
                                return function () {
                                    this.base = parentClass.prototype[name];

                                    return prop[name].apply(this, arguments);
                                };
                            }("Init");
                        }
                        else {
                            _class.prototype.Init = prop.Init;
                        }
                    }
                },
                P_addPrivateMember: function () {
                    var name = null,
                        _class = this.P_class,
                        private = this.prop.Private;

                    if (private) {
                        for (name in private) {
                            if (private.hasOwnProperty(name)) {
                                _class.prototype[name] = private[name];
                            }
                        }
                    }
                },
                P_addPublicMember: function () {
                    var name = null;

                    if (this.prop.Public) {
                        for (name in this.prop.Public) {
                            if (this.prop.Public.hasOwnProperty(name)) {
                                if (this.P_addSpecial("Public", name) === "continue") {
                                    continue;
                                }
                                this._addPublic(name);
                            }
                        }
                    }
                },
                _addPublic: function (name) {
                    this._addMemberAndSetBaseFunc(name, "Public");
                },
                P_prepareCheck: function () {
                    this._prepareCheckFor(this.prop.Public);
                    this._prepareCheckFor(this.prop.Protected);
                },
                P_addProtectedMember: function () {
                    var name = null;
                    var parentClass = this.parentClass,
                        prop = this.prop,
                        P_class = this.P_class;

                    if (this.prop.Protected) {
                        for (name in this.prop.Protected) {
                            if (this.prop.Protected.hasOwnProperty(name)) {
                                if (this.P_addSpecial("Protected", name) === "continue") {
                                    continue;
                                }
                                this._addMemberAndSetBaseFunc(name, "Protected");
                            }
                        }
                    }
                }
            }
        }());

        //创建抽象类
        function AClass() {
            var that = this;

            this.P_class = A;
            this.implementaionMap = {};
            this.parentClass = null;
            this.interface = null;
            this.prop = null;

            _initParentContainer(A);

            //构造函数
            function A() {
            };

            function _getByParent(args) {
                var _parent = args[0],
                    _prop = args[1];

                _checkOnlyOneParentClass(args);

                if (_prop === undefined) {
                    that.prop = _parent;
                    that.parentClass = null;
                    that.interface = null;
                }
                //{Class: xx, Interface: xx}
                else if (typeof _parent === "object") {
                    if (!_parent.Class && !_parent.Interface) {
                        throw new Error("Please add AbstractClass or Interface!");
                    }
                    that.parentClass = _parent.Class;
                    if (_isArray(_parent.Interface)) {
                        that.interface = _parent.Interface;
                    }
                    else if (typeof _parent.Interface === "function") {
                        that.interface = [_parent.Interface];
                    }
                    that.prop = _prop;
                }
                //直接为xx抽象类
                else if (typeof _parent === "function") {
                    that.parentClass = _parent;
                    that.interface = null;
                    that.prop = _prop;
                }
                else {
                    throw new Error("arguments is not allowed!");
                }
                if (_isInheritFromClass()) {
                    throw new Error("AbstractClass can't inherit class!");
                }

                _saveParents(A, that.interface, that.parentClass);
            };
            function _checkOnlyOneParentClass(args) {
                if (args.length >= 3) {
                    throw new Error("AbstractClass can only inherit from one parentClass");
                }

                if (args[0].Class) {
                    if (_isArray(args[0].Class) && args[0].Class.length >= 2) {
                        throw new Error("AbstractClass can only inherit from one parentClass");
                    }
                }
            };
            function _isInheritFromClass() {
                return _getFunctionName(that.parentClass) === "F";
            };
            this.P_inheritInterface = function () {
                if (this.interface) {
                    var i = 0,
                        len = 0;

                    for (i = 0, len = this.interface.length; i < len; i++) {
                        _extendDeep(this.interface[i].prototype, A.prototype);
                    }
                }
            };
            this.P_addSpecial = function (moduleName, name) {
                if (name === "Abstract") {
                    this.P_addAbstract(this.prop[moduleName][name]);
                    return "continue";
                }
                if (name === "Virtual") {
                    this.P_addVirtualAndCheck(this.prop[moduleName][name]);
                    return "continue";
                }
                return null;
            };

            this.buildAClass = function (args) {
                _getByParent(args);

                this.P_inherit();
                this.P_inheritInterface();
                //抽象类本身不能实例化，所以不在A中调用构造函数Init。
                //抽象类中的构造函数供子类构造函数中调用。
                this.P_addInit();
                this.P_addPrivateMember();
                this.P_addProtectedMember();
                this.P_addPublicMember();
                this.P_addStaticMember();
                _addOuterAbstract();
                _addOuterVirtual();

                this.P_prepareCheck();

                return A;
            };

            //放到外面的抽象成员，默认为公有抽象成员
            function _addOuterAbstract() {
                if (that.prop.Abstract) {
                    that.P_addAbstract(that.prop.Abstract);
                }
            };
            function _addOuterVirtual() {
                if (that.prop.Virtual) {
                    that.P_addVirtualAndCheck(that.prop.Virtual);
                }
            };
        };

        AClass.prototype = new Structure();

        //创建普通类
        function Class() {
            var that = this;

            this.implementaionMap = {};
            this.parentClass = null;
            this.interface = null;
            this.prop = null;

            this.P_class = F;
            //当前是否处于创建类的阶段。
            this.initializing = false;

            _initParentContainer(F);

            //构造函数
            function F() {
                var self = this,
                    args = arguments;

                function _copyProtoAttrToInstance() {
                    var i = null,
                        member = null,
                        toStr = Object.prototype.toString;

                    for (i in F.prototype) {
                        if (F.prototype.hasOwnProperty(i)) {
                            member = F.prototype[i];
                            if (toStr.call(member) === "[object Function]") {
                                continue;
                            }

                            self[i] = _extendDeep(member);
                        }
                    }

                    //F.prototype.baseClass的constructor为自带的属性，因此_extendDeep中的for不会遍历到F.prototype.baseClass.constructor
                    //因此该属性不会复制到self中，需要进行手动复制
                    if (self.baseClass) {
                        self.baseClass.constructor = F.prototype.baseClass.constructor;
                    }
                }

                function _init() {
                    if (!that.initializing) {
                        self.Init && self.Init.apply(self, args);
                    }
                }

                function _getInheritLayerCount(classInstance) {
                    var count = 0,
                        name = "baseClass";

                    while (classInstance[name]) {
                        count += 1;
                        name = "_" + name;
                    }

                    return count + 1;
                }

                function _getBaseClass(index) {
                    var count = _getInheritLayerCount(self),
                        index = index || 0,
                        i = 0,
                        len = count - 1 - index,
                        baseClass = "baseClass";

                    if (len <= 0) {
                        throw new Error("没有找到baseClass");
                    }

                    for (i = 0; i < len - 1; i++) {
                        baseClass = "_" + baseClass;
                    }

                    return  self[baseClass];
                }

                _copyProtoAttrToInstance();
                _init();

                this.isInstanceOf = function (_class) {
                    var i = 0,
                        len = F.yoop_parents.length;

                    for (i = 0; i < len; i++) {
                        if (F.yoop_parents[i] === _class) {
                            return true;
                        }
                    }

                    return this instanceof  _class;
                };

                this.stubParentMethod = function (sandbox, method, func) {
                    if (arguments.length === 2) {
                        sandbox.stub(_getBaseClass(0).constructor.prototype, method);
                    }
                    else if (arguments.length === 3) {
                        sandbox.stub(_getBaseClass(0).constructor.prototype, method, func);
                    }

                    this.lastBaseClassForTest = _getBaseClass(0).constructor.prototype;
                };
                this.stubParentMethodByAClass = function (sandbox, method, func) {
                    if (arguments.length === 2) {
                        sandbox.stub(_getBaseClass(1).constructor.prototype, method);
                    }
                    else if (arguments.length === 3) {
                        sandbox.stub(_getBaseClass(1).constructor.prototype, method, func);
                    }

                    this.lastBaseClassForTest = _getBaseClass(1).constructor.prototype;
                };
            }

            function _getByParent(args) {
                var _parent = args[0],
                    _prop = args[1];

                _checkOnlyOneParentClass(args);

                if (_prop === undefined) {
                    that.prop = _parent;
                    that.parentClass = null;
                    that.interface = null;
                }
                //{Class: xx, Interface: xx}
                else if (typeof _parent === "object") {
                    if (!_parent.Class && !_parent.Interface) {
                        throw new Error("Please add Class or Interface!");
                    }
                    that.parentClass = _parent.Class;
                    if (_isArray(_parent.Interface)) {
                        that.interface = _parent.Interface;
                    }
                    else if (typeof _parent.Interface === "function") {
                        that.interface = [_parent.Interface];
                    }
                    that.prop = _prop;
                }
                //直接为xx类
                else if (typeof _parent === "function") {
                    that.parentClass = _parent;
                    that.interface = null;
                    that.prop = _prop;
                }
                else {
                    throw new Error("arguments is not allowed!");
                }

                _saveParents(F, that.interface, that.parentClass);
            };
            function _checkOnlyOneParentClass(args) {
                if (args.length >= 3) {
                    throw new Error("class can only inherit from one parentClass");
                }

                if (args[0].Class) {
                    if (_isArray(args[0].Class) && args[0].Class.length >= 2) {
                        throw new Error("class can only inherit from one parentClass");
                    }
                }
            };
            this.P_addSpecial = function (moduleName, name) {
                if (name === "Abstract") {
                    throw new Error("class can't have abstract members");
                }
                if (name === "Virtual") {
                    this.P_addVirtualAndCheck(this.prop[moduleName][name]);
                    return "continue";
                }
                return null;
            };
            this.buildClass = function (args) {
                _getByParent(args);

                if (this.parentClass) {
                    this.initializint = true;
                    this.P_inherit();
                    this.initializing = false;
                }

                this.P_addInit();
                this.P_addPrivateMember();
                this.P_addProtectedMember();
                this.P_addPublicMember();
                this.P_addStaticMember();
                _addOuterAbstract();
                _addOuterVirtual();

                this.P_prepareCheck();
                this.P_checkImplementationOfAbstract();
                _checkEachImplementationOfInterface();

                return F;
            };
            function _checkEachImplementationOfInterface() {
                F.prototype._inheritedInterfaces = [];

                if (that.interface) {
                    var i = 0,
                        len = 0;

                    for (i = 0, len = that.interface.length; i < len; i++) {
                        that.P_checkImplementationOfInterface(that.interface[i]);
                        F.prototype._inheritedInterfaces.push(that.interface[i]);
                    }
                }
                if (_hasInterfaceInheritFromParentClass()) {
                    that.P_checkImplementationOfInterface(that.parentClass);

                    for (var j  in that.parentClass.prototype) {
                        if (j.contain("Interface_")) {
                            F.prototype._inheritedInterfaces.push(that.parentClass.prototype[j]);
                        }
                    }
                }

            }

            function _hasInterfaceInheritFromParentClass() {
                var name = "";

                for (name in F.prototype) {
                    if (name.contain("Interface_")) {
                        return true;
                    }
                }

                return false;
            };
            function _addOuterAbstract() {
                if (that.prop.Abstract) {
                    throw new Error("class can't have abstract members!");
                }
            };
            function _addOuterVirtual() {
                if (that.prop.Virtual) {
                    that.P_addVirtualAndCheck(that.prop.Virtual);
                }
            };
        };

        Class.prototype = new Structure();

        YOOP.AClass = function () {
            return new AClass().buildAClass(arguments);
        };
        YOOP.Class = function () {
            return new Class().buildClass(arguments);
        };
        YOOP.YOOP = {
            version: version
        };
    }());


    // 支持AMD、CMD、CommonJS规范
    // 支持通过script标签直接引用（引入命名空间YYC）

    var hasDefine = typeof define === "function",
        hasExports = typeof module !== 'undefined' && module.exports;

    if (hasDefine || hasExports) {
        if (hasDefine) {
            define(function () {
                return YOOP;
            });
        }
        else if (hasExports) {
            module.exports = YOOP;
        }
    }
    else {
        global.YYC = global.YYC || {};

        _extend(global.YYC, YOOP);
    }
}());
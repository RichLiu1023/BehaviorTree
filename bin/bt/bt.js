var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bt;
(function (bt) {
    bt.version = '1.1.0';
    var BehaviorTree = (function () {
        function BehaviorTree() {
        }
        return BehaviorTree;
    }());
    bt.BehaviorTree = BehaviorTree;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var BlackBoard = (function () {
        function BlackBoard() {
            this.btMethod = {};
            this.content = {};
        }
        BlackBoard.create = function () {
            return new bt.BlackBoard();
        };
        BlackBoard.prototype.clear = function () {
            this.content = {};
            this.btMethod = {};
        };
        return BlackBoard;
    }());
    bt.BlackBoard = BlackBoard;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var BaseNode = (function () {
        function BaseNode() {
            this.name = 'Node';
            this.hashid = 0;
            this.hashid = BaseNode.hashid++;
        }
        BaseNode.prototype.precondition = function (input) {
            if (this.condition) {
                return this.condition.execute(input);
            }
            return true;
        };
        BaseNode.prototype.tick = function (input) {
            if (!this.precondition(input)) {
                return 1;
            }
            return this.execute(input);
        };
        BaseNode.prototype.execute = function (input) {
            return 1;
        };
        BaseNode.prototype.getAndCreateMethod = function (input) {
            if (input.btMethod[this.hashid]) {
                return input.btMethod[this.hashid];
            }
            else {
                var data = { index: 0 };
                if (!input)
                    return data;
                input.btMethod[this.hashid] = data;
                return input.btMethod[this.hashid];
            }
        };
        BaseNode.prototype.clearMethod = function (input) {
            if (input.btMethod[this.hashid]) {
                input.btMethod[this.hashid] = null;
            }
        };
        BaseNode.hashid = 1;
        return BaseNode;
    }());
    bt.BaseNode = BaseNode;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var ErrorCode = (function () {
        function ErrorCode() {
        }
        ErrorCode.e1 = '子节点不存在';
        return ErrorCode;
    }());
    bt.ErrorCode = ErrorCode;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Action = (function (_super) {
        __extends(Action, _super);
        function Action() {
            _super.call(this);
            this.name = 'Action';
        }
        Action.prototype.setCondition = function (condition) {
            this.condition = condition;
            return this;
        };
        return Action;
    }(bt.BaseNode));
    bt.Action = Action;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Composite = (function (_super) {
        __extends(Composite, _super);
        function Composite() {
            _super.call(this);
            this.children = [];
        }
        Composite.prototype.setCondition = function (condition) {
            this.condition = condition;
            return this;
        };
        Composite.prototype.addNote = function (node) {
            this.children.push(node);
            return this;
        };
        Composite.prototype.clearMethod = function (input) {
            _super.prototype.clearMethod.call(this, input);
            var len = this.children.length;
            for (var idx = 0; idx < len; idx++) {
                var node = this.children[idx];
                node.clearMethod(input);
            }
        };
        return Composite;
    }(bt.BaseNode));
    bt.Composite = Composite;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Queue = (function (_super) {
        __extends(Queue, _super);
        function Queue() {
            _super.call(this);
            this.name = 'Queue';
        }
        Queue.create = function () {
            return new bt.Queue();
        };
        Queue.prototype.execute = function (input) {
            var len = this.children.length;
            if (len == 0)
                throw bt.ErrorCode.e1;
            var state = 0;
            var data = this.getAndCreateMethod(input);
            for (var idx = data.index; idx < len; idx++) {
                var node = this.children[idx];
                var nodestate = node.tick(input);
                if (nodestate == 2) {
                    data.index = idx;
                    state = 2;
                    break;
                }
                else {
                    node.clearMethod(input);
                }
            }
            if (state != 2) {
                data.index = 0;
            }
            return state;
        };
        return Queue;
    }(bt.Composite));
    bt.Queue = Queue;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Selector = (function (_super) {
        __extends(Selector, _super);
        function Selector() {
            _super.call(this);
            this.name = 'Selector';
        }
        Selector.create = function () {
            return new bt.Selector();
        };
        Selector.prototype.execute = function (input) {
            var len = this.children.length;
            if (len == 0)
                throw bt.ErrorCode.e1;
            var state = 1;
            var data = this.getAndCreateMethod(input);
            for (var idx = data.index; idx < len; idx++) {
                var node = this.children[idx];
                state = node.tick(input);
                if (state == 0) {
                    state = 0;
                    break;
                }
                else if (state == 2) {
                    data.index = idx;
                    state = 2;
                    break;
                }
                else {
                    node.clearMethod(input);
                }
            }
            if (state != 2) {
                data.index = 0;
            }
            return state;
        };
        return Selector;
    }(bt.Composite));
    bt.Selector = Selector;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Sequences = (function (_super) {
        __extends(Sequences, _super);
        function Sequences() {
            _super.call(this);
            this.name = 'Sequences';
        }
        Sequences.create = function () {
            return new bt.Sequences();
        };
        Sequences.prototype.execute = function (input) {
            var len = this.children.length;
            if (len == 0)
                throw bt.ErrorCode.e1;
            var state = 0;
            var data = this.getAndCreateMethod(input);
            for (var idx = data.index; idx < len; idx++) {
                var node = this.children[idx];
                state = node.tick(input);
                if (state == 2) {
                    data.index = idx;
                    state = 2;
                    break;
                }
                if (state == 1) {
                    node.clearMethod(input);
                    break;
                }
            }
            if (state != 2) {
                data.index = 0;
            }
            return state;
        };
        return Sequences;
    }(bt.Composite));
    bt.Sequences = Sequences;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var ConditionComposite = (function () {
        function ConditionComposite() {
            this.children = [];
        }
        ConditionComposite.prototype.addCondition = function (node) {
            this.children.push(node);
            return this;
        };
        ConditionComposite.prototype.execute = function (input) {
            return true;
        };
        return ConditionComposite;
    }());
    bt.ConditionComposite = ConditionComposite;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var ConditionDecorator = (function () {
        function ConditionDecorator() {
        }
        ConditionDecorator.prototype.execute = function (input) {
            return true;
        };
        ConditionDecorator.prototype.setChild = function (child) {
            this.child = child;
            return this;
        };
        return ConditionDecorator;
    }());
    bt.ConditionDecorator = ConditionDecorator;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var ConditionInverter = (function (_super) {
        __extends(ConditionInverter, _super);
        function ConditionInverter() {
            _super.call(this);
        }
        ConditionInverter.create = function () {
            return new bt.ConditionInverter();
        };
        ConditionInverter.prototype.execute = function (input) {
            if (this.child) {
                return !this.child.execute(input);
            }
            return true;
        };
        return ConditionInverter;
    }(bt.ConditionDecorator));
    bt.ConditionInverter = ConditionInverter;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var ConditionSelector = (function (_super) {
        __extends(ConditionSelector, _super);
        function ConditionSelector() {
            _super.call(this);
        }
        ConditionSelector.create = function () {
            return new bt.ConditionSelector();
        };
        ConditionSelector.prototype.execute = function (input) {
            var len = this.children.length;
            if (len == 0)
                return true;
            for (var idx = 0; idx < len; idx++) {
                var node = this.children[idx];
                var result = node.execute(input);
                if (result) {
                    return true;
                }
            }
            return false;
        };
        return ConditionSelector;
    }(bt.ConditionComposite));
    bt.ConditionSelector = ConditionSelector;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var ConditionSequences = (function (_super) {
        __extends(ConditionSequences, _super);
        function ConditionSequences() {
            _super.call(this);
        }
        ConditionSequences.create = function () {
            return new bt.ConditionSequences();
        };
        ConditionSequences.prototype.execute = function (input) {
            var len = this.children.length;
            if (len == 0)
                return true;
            for (var idx = 0; idx < len; idx++) {
                var node = this.children[idx];
                var result = node.execute(input);
                if (result == false) {
                    return false;
                }
            }
            return true;
        };
        return ConditionSequences;
    }(bt.ConditionComposite));
    bt.ConditionSequences = ConditionSequences;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Decorator = (function (_super) {
        __extends(Decorator, _super);
        function Decorator() {
            _super.call(this);
        }
        Decorator.prototype.setCondition = function (condition) {
            this.condition = condition;
            return this;
        };
        Decorator.prototype.setChild = function (child) {
            this.child = child;
            return this;
        };
        return Decorator;
    }(bt.BaseNode));
    bt.Decorator = Decorator;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Inverter = (function (_super) {
        __extends(Inverter, _super);
        function Inverter() {
            _super.call(this);
            this.name = 'Inverter';
        }
        Inverter.create = function () {
            return new bt.Inverter();
        };
        Inverter.prototype.execute = function (input) {
            if (!this.child)
                throw bt.ErrorCode.e1;
            var state = this.child.tick(input);
            if (state == 1)
                state = 0;
            if (state == 0)
                state = 1;
            return state;
        };
        return Inverter;
    }(bt.Decorator));
    bt.Inverter = Inverter;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Repeater = (function (_super) {
        __extends(Repeater, _super);
        function Repeater() {
            _super.call(this);
            this.count = 1;
            this.name = 'Repeater';
        }
        Repeater.create = function (count) {
            var unit = new bt.Repeater();
            unit.count = Math.max(1, count || 1);
            return unit;
        };
        Repeater.prototype.execute = function (input) {
            if (!this.child)
                throw bt.ErrorCode.e1;
            var state = this.child.tick(input);
            if (state == 2) {
                return 2;
            }
            var data = this.getAndCreateMethod(input);
            data.curCount++;
            if (data.curCount >= this.count) {
                data.curCount = 0;
                return 0;
            }
            return 2;
        };
        Repeater.prototype.getAndCreateMethod = function (input) {
            if (input.btMethod[this.hashid]) {
                return input.btMethod[this.hashid];
            }
            else {
                var data = { curCount: 0 };
                if (!input)
                    return data;
                input.btMethod[this.hashid] = data;
                return input.btMethod[this.hashid];
            }
        };
        return Repeater;
    }(bt.Decorator));
    bt.Repeater = Repeater;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var RepeatUntilFail = (function (_super) {
        __extends(RepeatUntilFail, _super);
        function RepeatUntilFail() {
            _super.call(this);
            this.name = 'RepeatUntilFail';
        }
        RepeatUntilFail.create = function () {
            return new bt.RepeatUntilFail();
        };
        RepeatUntilFail.prototype.execute = function (input) {
            if (!this.child)
                throw bt.ErrorCode.e1;
            var state = this.child.tick(input);
            if (state == 2) {
                return 2;
            }
            if (state == 1) {
                return 0;
            }
            return 2;
        };
        return RepeatUntilFail;
    }(bt.Decorator));
    bt.RepeatUntilFail = RepeatUntilFail;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var RepeatUntilSuccess = (function (_super) {
        __extends(RepeatUntilSuccess, _super);
        function RepeatUntilSuccess() {
            _super.call(this);
            this.name = 'RepeatUntilSuccess';
        }
        RepeatUntilSuccess.create = function () {
            return new bt.RepeatUntilSuccess();
        };
        RepeatUntilSuccess.prototype.execute = function (input) {
            if (!this.child)
                throw bt.ErrorCode.e1;
            var state = this.child.tick(input);
            if (state == 2) {
                return 2;
            }
            if (state == 0) {
                return 0;
            }
            return 2;
        };
        return RepeatUntilSuccess;
    }(bt.Decorator));
    bt.RepeatUntilSuccess = RepeatUntilSuccess;
})(bt || (bt = {}));
var bt;
(function (bt) {
    var Succeeder = (function (_super) {
        __extends(Succeeder, _super);
        function Succeeder() {
            _super.call(this);
            this.name = 'Succeeder';
        }
        Succeeder.create = function () {
            return new bt.Succeeder();
        };
        Succeeder.prototype.execute = function (input) {
            if (!this.child)
                throw bt.ErrorCode.e1;
            var state = this.child.tick(input);
            if (state == 2) {
                return 2;
            }
            return 0;
        };
        return Succeeder;
    }(bt.Decorator));
    bt.Succeeder = Succeeder;
})(bt || (bt = {}));

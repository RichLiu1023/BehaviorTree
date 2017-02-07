declare module bt {
    const version: string;
    const enum State {
        success = 0,
        failure = 1,
        running = 2,
    }
    class BehaviorTree {
    }
}
declare module bt {
    class BlackBoard {
        btMethod: any;
        content: any;
        constructor();
        static create(): bt.BlackBoard;
        clear(): void;
    }
}
declare module bt {
    interface ICondition {
        execute(input: bt.BlackBoard): boolean;
    }
}
declare module bt {
    class BaseNode {
        static hashid: number;
        name: string;
        condition: bt.ICondition;
        hashid: number;
        constructor();
        precondition(input: bt.BlackBoard): boolean;
        tick(input: bt.BlackBoard): number;
        execute(input: bt.BlackBoard): number;
    }
}
declare module bt {
    class ErrorCode {
        static e1: string;
    }
}
declare module bt {
    interface INode {
        precondition(input: bt.BlackBoard): boolean;
        execute(input: bt.BlackBoard): number;
        tick(input: bt.BlackBoard): number;
    }
}
declare module bt {
    class Action extends BaseNode implements bt.INode {
        name: string;
        constructor();
        setCondition(condition: bt.ICondition): bt.INode;
    }
}
declare module bt {
    class Composite extends bt.BaseNode {
        protected children: bt.INode[];
        constructor();
        setCondition(condition: bt.ICondition): bt.Composite;
        addNote(node: bt.INode): bt.Composite;
    }
}
declare module bt {
    class Queue extends bt.Composite implements bt.INode {
        constructor();
        static create(): bt.Queue;
        execute(input: bt.BlackBoard): number;
        private getAndCreateMethod(input);
    }
}
declare module bt {
    class Selector extends bt.Composite implements bt.INode {
        constructor();
        static create(): bt.Selector;
        execute(input: bt.BlackBoard): number;
        private getAndCreateMethod(input);
    }
}
declare module bt {
    class Sequences extends bt.Composite implements bt.INode {
        constructor();
        static create(): bt.Sequences;
        execute(input: bt.BlackBoard): number;
        private getAndCreateMethod(input);
    }
}
declare module bt {
    class ConditionComposite implements bt.ICondition {
        protected children: bt.ICondition[];
        constructor();
        addCondition(node: bt.ICondition): bt.ConditionComposite;
        execute(input: bt.BlackBoard): boolean;
    }
}
declare module bt {
    class ConditionDecorator implements bt.ICondition {
        child: bt.ICondition;
        constructor();
        execute(input: bt.BlackBoard): boolean;
        setChild(child: bt.ICondition): bt.ICondition;
    }
}
declare module bt {
    class ConditionInverter extends bt.ConditionDecorator {
        constructor();
        static create(): bt.ConditionInverter;
        execute(input: bt.BlackBoard): boolean;
    }
}
declare module bt {
    class ConditionSelector extends bt.ConditionComposite {
        constructor();
        static create(): bt.ConditionSelector;
        execute(input: bt.BlackBoard): boolean;
    }
}
declare module bt {
    class ConditionSequences extends bt.ConditionComposite {
        constructor();
        static create(): bt.ConditionSequences;
        execute(input: bt.BlackBoard): boolean;
    }
}
declare module bt {
    class Decorator extends bt.BaseNode {
        protected child: bt.INode;
        constructor();
        setCondition(condition: bt.ICondition): bt.Decorator;
        setChild(child: bt.INode): bt.Decorator;
    }
}
declare module bt {
    class Inverter extends bt.Decorator implements bt.INode {
        constructor();
        static create(): bt.Inverter;
        execute(input: bt.BlackBoard): number;
    }
}
declare module bt {
    class Repeater extends bt.Decorator implements bt.INode {
        count: number;
        constructor();
        static create(count?: number): bt.Repeater;
        execute(input: bt.BlackBoard): number;
        private getAndCreateMethod(input);
    }
}
declare module bt {
    class RepeatUntilFail extends bt.Decorator implements bt.INode {
        constructor();
        static create(): bt.RepeatUntilFail;
        execute(input: bt.BlackBoard): number;
    }
}
declare module bt {
    class RepeatUntilSuccess extends bt.Decorator implements bt.INode {
        constructor();
        static create(): bt.RepeatUntilSuccess;
        execute(input: bt.BlackBoard): number;
    }
}
declare module bt {
    class Succeeder extends bt.Decorator implements bt.INode {
        constructor();
        static create(): bt.Succeeder;
        execute(input: bt.BlackBoard): number;
    }
}

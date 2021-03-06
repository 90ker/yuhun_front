let rarityOptions = [{
        value: "SP",
    },
    {
        value: "SSR",
    },
    {
        value: "SR",
    },
    {
        value: "R",
    },
    {
        value: "N",
    },
]

let heroStarOptions = [{
        label: "二星",
        value: 2,
    },
    {
        label: "三星",
        value: 3,
    },
    {
        label: "四星",
        value: 4,
    },
    {
        label: "五星",
        value: 5,
    },
    {
        label: "六星",
        value: 6,
    },
]

let excludeOptions = [{
        name: "一号位",
        value: 1
    },
    {
        name: "二号位",
        value: 2
    },
    {
        name: "三号位",
        value: 3
    },
    {
        name: "四号位",
        value: 4
    },
    {
        name: "五号位",
        value: 5
    },
    {
        name: "六号位",
        value: 6
    },
]
let limitAttrList = [{
        name: "最终伤害",
        type: "damage",
        max: 600000,
        min: 0
    },
    {
        name: "速度",
        type: "speed",
        max: 500,
        min: 0
    },
    {
        name: "最终攻击",
        type: "attack",
        max: 5000,
        min: 0
    },
    {
        name: "攻击加成",
        type: "attackRate",
        max: 500,
        min: 0
    },
    {
        name: "暴击率",
        type: "critRate",
        max: 110,
        min: 0
    },
    {
        name: "暴击加成",
        type: "critPower",
        max: 400,
        min: 0
    },
    {
        name: "生命值",
        type: "hp",
        max: 50000,
        min: 0
    },
    {
        name: "生命加成",
        type: "hpRate",
        max: 500,
        min: 0
    },
    {
        name: "最终防御",
        type: "defense",
        max: 5000,
        min: 0
    },
    {
        name: "防御加成",
        type: "defenseRate",
        max: 500,
        min: 0
    },
    {
        name: "效果命中",
        type: "effectHitRate",
        max: 100,
        min: 0,
    },
    {
        name: "效果抵抗",
        type: "effectResistRate",
        max: 100,
        min: 0,
    },
]

let includeList = [{
        name: "一号位",
        pos: 0,
        star: [],
        level: [15, 15],
        entity: '',
        include: true
    },
    {
        name: "二号位",
        pos: 1,
        star: [],
        level: [15, 15],
        entity: '',
        include: true
    },
    {
        name: "三号位",
        pos: 2,
        star: [],
        level: [15, 15],
        entity: '',
        include: true
    },
    {
        name: "四号位",
        pos: 3,
        star: [],
        level: [15, 15],
        entity: '',
        include: true
    },
    {
        name: "五号位",
        pos: 4,
        star: [],
        level: [15, 15],
        entity: '',
        include: true
    },
    {
        name: "六号位",
        pos: 5,
        star: [],
        level: [15, 15],
        entity: '',
        include: true
    },
]


let yuhunStarOptions = [{
        name: "四星",
        value: "4"
    },
    {
        name: "五星",
        value: "5"
    },
    {
        name: "六星",
        value: "6"
    },
]

let yuhunSec = [{
        name: '攻击加成',
        type: 'AttackRate'
    },
    {
        name: '生命加成',
        type: 'HpRate'
    },
    {
        name: '防御加成',
        type: 'DefenseRate'
    },
    {
        name: '速度',
        type: 'Speed'
    }
]
let yuhunFourth = [{
        name: '攻击加成',
        type: 'AttackRate'
    },
    {
        name: '生命加成',
        type: 'HpRate'
    },
    {
        name: '防御加成',
        type: 'DefenseRate'
    },
    {
        name: '效果命中',
        type: 'EffectHitRate'
    },
    {
        name: '效果抵抗',
        type: 'EffectResistRate'
    }
]
let yuhunSixth = [{
        name: '攻击加成',
        type: 'AttackRate'
    },
    {
        name: '生命加成',
        type: 'HpRate'
    },
    {
        name: '防御加成',
        type: 'DefenseRate'
    },
    {
        name: '暴击率',
        type: 'CritRate'
    },
    {
        name: '暴击伤害',
        type: 'CritPower'
    }
]
let yuhunSite = [{
    site: '二号位',
    pos: 1,
    obj: yuhunSec,
    selects: []
}, {
    site: '四号位',
    pos: 3,
    obj: yuhunFourth,
    selects: []
}, {
    site: '六号位',
    pos: 5,
    obj: yuhunSixth,
    selects: []
}]

let targets = [{
    target: '伤害',
    value: 'damage'
}, {

    target: '攻击',
    value: 'attack'
}, {
    target: '生命',
    value: "hp"
}, {
    target: '防御',
    value: "defense"
}, {
    target: '暴击',
    value: "critRate"
}, {
    target: '暴击伤害',
    value: "critPower"
}, {
    target: '速度',
    value: "speed"
}, {
    target: '效果命中',
    value: "effectHitRate"
}, {
    target: '效果抵抗',
    value: "effectResistRate"
}]

let tags = [
    // 1:排除，2:星级，3:等级，4：指定
    {
        type: 1,
        name: ''
    },
    {
        type: 2,
        name: ''
    },
    {
        type: 3,
        name: ''
    },
    {
        type: 4,
        name: ''
    },
]

export {
    rarityOptions,
    heroStarOptions,
    limitAttrList,
    includeList,
    yuhunStarOptions,
    excludeOptions,
    yuhunSite,
    targets,
    tags
};
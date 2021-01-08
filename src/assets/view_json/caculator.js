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
        max: 0,
        min: 0
    },
    {
        name: "速度",
        type: "speed",
        max: 0,
        min: 0
    },
    {
        name: "最终攻击",
        type: "attack",
        max: 0,
        min: 0
    },
    {
        name: "攻击加成",
        type: "attackRate",
        max: 0,
        min: 0
    },
    {
        name: "暴击率",
        type: "critRate",
        max: 0,
        min: 0
    },
    {
        name: "暴击加成",
        type: "critPower",
        max: 0,
        min: 0
    },
    {
        name: "生命值",
        type: "hp",
        max: 0,
        min: 0
    },
    {
        name: "生命加成",
        type: "hpRate",
        max: 0,
        min: 0
    },
    {
        name: "最终防御",
        type: "defense",
        max: 0,
        min: 0
    },
    {
        name: "防御加成",
        type: "defenseRate",
        max: 0,
        min: 0
    },
    {
        name: "效果命中",
        type: "effectHitRate",
        max: 0,
        min: 0,
    },
    {
        name: "效果抵抗",
        type: "effectResistRate",
        max: 0,
        min: 0,
    },
]

let includeList = [{
        name: "一号位",
        value: "1",
        star: [],
        level: [15, 15],
        entity: '',
        include : true
    },
    {
        name: "二号位",
        value: "2",
        star: [],
        level: [15, 15],
        entity: '',
        include : true
    },
    {
        name: "三号位",
        value: "3",
        star: [],
        level: [15, 15],
        entity: '',
        include : true
    },
    {
        name: "四号位",
        value: "4",
        star: [],
        level: [15, 15],
        entity: '',
        include : true
    },
    {
        name: "五号位",
        value: "5",
        star: [],
        level: [15, 15],
        entity: '',
        include : true
    },
    {
        name: "六号位",
        value: "6",
        star: [],
        level: [15, 15],
        entity: '',
        include : true
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
        value: 1
    },
    {
        name: '生命加成',
        value: 2
    },
    {
        name: '防御加成',
        value: 3
    },
    {
        name: '速度',
        value: 4
    }
]
let yuhunFourth = [{
        name: '攻击加成',
        value: 1
    },
    {
        name: '生命加成',
        value: 2
    },
    {
        name: '防御加成',
        value: 3
    },
    {
        name: '效果命中',
        value: 4
    },
    {
        name: '效果抵抗',
        value: 5
    }
]
let yuhunSixth = [{
        name: '攻击加成',
        value: 1
    },
    {
        name: '生命加成',
        value: 2
    },
    {
        name: '防御加成',
        value: 3
    },
    {
        name: '暴击率',
        value: 4
    },
    {
        name: '暴击伤害',
        value: 5
    }
]
let yuhunSite = [{
    site: '二号位',
    obj: yuhunSec,
    selects: []
}, {
    site: '四号位',
    obj: yuhunFourth,
    selects: []
}, {
    site: '六号位',
    obj: yuhunSixth,
    selects: []
}]

let targets = [{
    target: '攻击',
    value: 1
}, {
    target: '生命',
    value: 2
}, {
    target: '防御',
    value: 3
}, {
    target: '暴击',
    value: 4
}, {
    target: '暴击伤害',
    value: 5
}, {
    target: '速度',
    value: 6
}, {
    target: '效果命中',
    value: 7
}, {
    target: '效果抵抗',
    value: 8
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
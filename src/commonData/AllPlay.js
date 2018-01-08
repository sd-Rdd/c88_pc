export const AllPlay = {
  // 11选5
  '11': {
    playList: [{
        name: "三码",
        id: 13
      },
      {
        name: "二码",
        id: 12
      },
      {
        name: "不定胆",
        id: 14
      },
      {
        name: "定位胆",
        id: 15
      },
      {
        name: "任选",
        id: 11
      }
    ],
    methodList: [
      [{
          ids: 13,
          ruleName: "前三直选",
          subName: [{
            id: 11,
            name: "复式"
          }]
        },
        {
          ruleName: "前三组选",
          subName: [{
            id: 12,
            name: "复式"
          }]
        }
      ],
      [{
          ids: 12,
          ruleName: "前二直选",
          subName: [{
            id: 9,
            name: "复式"
          }]
        },
        {
          ruleName: "前二组选",
          subName: [{
            id: 10,
            name: "复式"
          }]
        }
      ],
      [{
        ids: 14,
        ruleName: "不定胆",
        subName: [{
          id: 23,
          name: "前三位"
        }]
      }],
      [{
        ids: 15,
        ruleName: "定位胆",
        subName: [{
          id: 24,
          name: "定位胆"
        }]
      }],
      [{
        ids: 11,
        ruleName: "任选复式",
        subName: [{
            id: 22,
            name: "一中一"
          },
          {
            id: 1,
            name: "二中二"
          },
          {
            id: 2,
            name: "三中三"
          },
          {
            id: 3,
            name: "四中四"
          },
          {
            id: 4,
            name: "五中五"
          },
          {
            id: 5,
            name: "六中五"
          },
          {
            id: 6,
            name: "七中五"
          },
          {
            id: 7,
            name: "八中五"
          }
        ]
      }]
    ]
  },
  '21': {
    playList: [{
        name: "五星",
        id: 12
      },
      {
        name: "后四",
        id: 23
      },
      {
        name: "前四",
        id: 24
      },
      {
        name: "后三",
        id: 13
      },
      {
        name: "中三",
        id: 25
      },
      {
        name: "前三",
        id: 26
      },
      {
        name: "二星",
        id: 14
      },
      {
        name: "定位胆",
        id: 11
      },
      {
        name: "不定胆",
        id: 16
      },
      {
        name: "任选",
        id: 17
      },
      {
        name: "跨度",
        id: 20
      },
      {
        name: "趣味",
        id: 21
      },
      {
        name: "龙虎",
        id: 22
      }
    ],
    methodList: [
      [{
          ids: 12,
          ruleName: "五星直选",
          subName: [{
            id: 1211,
            name: "复式"
          }, {
            id: 1213,
            name: "组合"
          }]
        },
        {
          ruleName: "五星组选",
          subName: [{
              id: 1214,
              name: "组选120"
            },
            {
              id: 1215,
              name: "组选60"
            },
            {
              id: 1216,
              name: "组选30"
            },
            {
              id: 1217,
              name: "组选20"
            },
            {
              id: 1218,
              name: "组选10"
            },
            {
              id: 1219,
              name: "组选5"
            }
          ]
        }
      ],
      [{
          ids: 23,
          ruleName: "后四直选",
          subName: [{
            id: 2311,
            name: "复式"
          }, {
            id: 2312,
            name: "组合"
          }]
        },
        {
          ruleName: "后四组选",
          subName: [{
              id: 2313,
              name: "组选24"
            },
            {
              id: 2314,
              name: "组选12"
            },
            {
              id: 2315,
              name: "组选6"
            },
            {
              id: 2316,
              name: "组选4"
            }
          ]
        }
      ],
      [{
          ids: 24,
          ruleName: "前四直选",
          subName: [{
            id: 2411,
            name: "复式"
          }, {
            id: 2412,
            name: "组合"
          }]
        },
        {
          ruleName: "前四组选",
          subName: [{
              id: 2413,
              name: "组选24"
            },
            {
              id: 2414,
              name: "组选12"
            },
            {
              id: 2415,
              name: "组选6"
            },
            {
              id: 2416,
              name: "组选4"
            }
          ]
        }
      ],
      [{
          ids: 13,
          ruleName: "后三直选",
          subName: [{
            id: 1311,
            name: "复式"
          }, {
            id: 1314,
            name: "直选和值"
          }]
        },
        {
          ruleName: "后三组选",
          subName: [{
            id: 1312,
            name: "组三"
          }, {
            id: 1313,
            name: "组六"
          }]
        }
      ],
      [{
          ids: 25,
          ruleName: "中三直选",
          subName: [{
            id: 2511,
            name: "复式"
          }, {
            id: 2512,
            name: "直选和值"
          }]
        },
        {
          ruleName: "中三组选",
          subName: [{
            id: 2513,
            name: "组三"
          }, {
            id: 2514,
            name: "组六"
          }]
        }
      ],
      [{
          ids: 26,
          ruleName: "前三直选",
          subName: [{
            id: 2611,
            name: "复式"
          }, {
            id: 2612,
            name: "直选和值"
          }]
        },
        {
          ruleName: "前三组选",
          subName: [{
            id: 2613,
            name: "组三"
          }, {
            id: 2614,
            name: "组六"
          }]
        }
      ],
      [{
          ids: 14,
          ruleName: "后二直选",
          subName: [{
              id: 1411,
              name: "复式"
            },
            {
              id: 1413,
              name: "直选和值"
            },
            {
              id: 1414,
              name: "大小单双"
            }
          ]
        },
        {
          ruleName: "后二组选",
          subName: [{
            id: 1412,
            name: "复式"
          }]
        },
        {
          ruleName: "前二直选",
          subName: [{
              id: 1415,
              name: "复式"
            },
            {
              id: 1416,
              name: "直选和值"
            },
            {
              id: 1417,
              name: "大小单双"
            }
          ]
        },
        {
          ruleName: "前二组选",
          subName: [{
            id: 1418,
            name: "复式"
          }]
        }
      ],
      [{
        ids: 11,
        ruleName: "定位胆",
        subName: [{
          id: 1111,
          name: "定位胆"
        }]
      }],
      [{
          ids: 16,
          ruleName: "三星不定胆一码",
          subName: [{
              id: 1613,
              name: "后三"
            },
            {
              id: 1622,
              name: "中三"
            },
            {
              id: 1611,
              name: "前三"
            }
          ]
        },
        {
          ruleName: "三星不定胆二码",
          subName: [{
              id: 1614,
              name: "后三"
            },
            {
              id: 1623,
              name: "中三"
            },
            {
              id: 1612,
              name: "前三"
            }
          ]
        }
      ],
      [{
          ids: 17,
          ruleName: "任二",
          subName: [{
            id: 1711,
            name: "复式"
          }, {
            id: 1713,
            name: "组选"
          }]
        },
        {
          ruleName: "任三",
          subName: [{
              id: 1811,
              name: "复式"
            },
            {
              id: 1813,
              name: "组三"
            },
            {
              id: 1814,
              name: "组六"
            }
          ]
        },
        {
          ruleName: "任四",
          subName: [{
            id: 1911,
            name: "复式"
          }]
        }
      ],
      [{
        ids: 20,
        ruleName: "跨度",
        subName: [{
            id: 2011,
            name: "前三跨度"
          },
          {
            id: 2022,
            name: "中三跨度"
          },
          {
            id: 2023,
            name: "后三跨度"
          },
          {
            id: 2024,
            name: "前二跨度"
          },
          {
            id: 2025,
            name: "后二跨度"
          }
        ]
      }],
      [{
        ids: 21,
        ruleName: "特殊",
        subName: [{
            id: 2111,
            name: "一帆风顺"
          },
          {
            id: 2112,
            name: "好事成双"
          },
          {
            id: 2113,
            name: "三星报喜"
          },
          {
            id: 2114,
            name: "四季发财"
          }
        ]
      }],
      [{
        ids: 22,
        ruleName: "龙虎",
        subName: [{
            id: 2211,
            name: "万千"
          },
          {
            id: 2212,
            name: "万百"
          },
          {
            id: 2213,
            name: "万十"
          },
          {
            id: 2214,
            name: "万个"
          },
          {
            id: 2215,
            name: "千百"
          },
          {
            id: 2216,
            name: "千十"
          },
          {
            id: 2217,
            name: "千个"
          },
          {
            id: 2218,
            name: "百十"
          },
          {
            id: 2219,
            name: "百个"
          },
          {
            id: 2220,
            name: "十个"
          }
        ]
      }]
    ]
  },
  '31': {
    playList: [{
        name: "二不同号",
        id: 15
      },
      {
        name: "二同号",
        id: 14
      },
      {
        name: "三不同号",
        id: 12
      },
      {
        name: "三同号",
        id: 11
      },
      {
        name: "三连号",
        id: 13
      },
      {
        name: "和值",
        id: 16
      }
    ],
    methodList: [
      [{
        ids: 15,
        ruleName: "二不同号",
        subName: [{
          id: 8,
          name: "标准选号"
        }, {
          id: 9,
          name: "胆拖选号"
        }]
      }],
      [{
          ids: 14,
          ruleName: "二同号单选",
          subName: [{
            id: 7,
            name: "标准选号"
          }]
        },
        {
          ruleName: "二同号复选",
          subName: [{
            id: 6,
            name: "二同号复选"
          }]
        }
      ],
      [{
        ids: 12,
        ruleName: "三不同号",
        subName: [{
          id: 4,
          name: "标准选号"
        }]
      }],
      [{
          ids: 11,
          ruleName: "三同号单选",
          subName: [{
            id: 3,
            name: "三同号单选"
          }]
        },
        {
          ruleName: "三同号通选",
          subName: [{
            id: 2,
            name: "三同号通选"
          }]
        }
      ],
      [{
        ids: 13,
        ruleName: "三连号通选",
        subName: [{
          id: 5,
          name: "三连号通选"
        }]
      }],
      [{
        ids: 16,
        ruleName: "和值",
        subName: [{
          id: 1,
          name: "和值"
        }]
      }]
    ]
  },
  '41': {
    playList: [{
        name: "前一",
        id: 11
      },
      {
        name: "前二",
        id: 12
      },
      {
        name: "前三",
        id: 13
      },
      {
        name: "定位胆",
        id: 14
      },
      {
        name: "大小",
        id: 15
      },
      {
        name: "单双",
        id: 16
      }
    ],
    methodList: [
      [{
        ids: 11,
        ruleName: "前一",
        subName: [{
          id: 1,
          name: "前一"
        }]
      }],
      [{
        ids: 12,
        ruleName: "前二",
        subName: [{
          id: 2,
          name: "前二复式"
        }]
      }],
      [{
        ids: 13,
        ruleName: "前三",
        subName: [{
          id: 3,
          name: "前三复式"
        }]
      }],
      [{
        ids: 14,
        ruleName: "定位胆",
        subName: [{
          id: 5,
          name: "第1~5名"
        }, {
          id: 6,
          name: "第6~10名"
        }]
      }],
      [{
        ids: 15,
        ruleName: "大小",
        subName: [{
            id: 7,
            name: "第一名"
          },
          {
            id: 8,
            name: "第二名"
          },
          {
            id: 9,
            name: "第三名"
          }
        ]
      }],
      [{
        ids: 16,
        ruleName: "单双",
        subName: [{
            id: 10,
            name: "第一名"
          },
          {
            id: 11,
            name: "第二名"
          },
          {
            id: 12,
            name: "第三名"
          }
        ]
      }]
    ]
  },
  '101': {
    playList: [{
        name: "三码",
        id: 11
      },
      {
        name: "二码",
        id: 12
      },
      {
        name: "定位胆",
        id: 13
      },
      {
        name: "不定胆",
        id: 14
      }
    ],
    methodList: [
      [{
          ids: 11,
          ruleName: "直选",
          subName: [{
            id: 1111,
            name: "复式"
          }, {
            id: 1112,
            name: "直选和值"
          }]
        },
        {
          ruleName: "组选",
          subName: [{
            id: 1113,
            name: "组三"
          }, {
            id: 1114,
            name: "组六"
          }]
        }
      ],
      [{
          ids: 12,
          ruleName: "后二码直选",
          subName: [{
            id: 1212,
            name: "复式"
          }, {
            id: 1215,
            name: "直选和值"
          }]
        },
        {
          ruleName: "后二码组选",
          subName: [{
            id: 1214,
            name: "复式"
          }]
        },
        {
          ruleName: "前二码直选",
          subName: [{
            id: 1211,
            name: "复式"
          }, {
            id: 1216,
            name: "直选和值"
          }]
        },
        {
          ruleName: "前二码组选",
          subName: [{
            id: 1213,
            name: "复式"
          }]
        }
      ],
      [{
        ids: 13,
        ruleName: "定位胆",
        subName: [{
          id: 1311,
          name: "定位胆"
        }]
      }],
      [{
        ids: 14,
        ruleName: "不定胆",
        subName: [{
          id: 1411,
          name: "一码不定胆"
        }]
      }]
    ]
  },
}

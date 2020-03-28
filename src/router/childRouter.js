// 导入 index 组件的子路由
import Chart from "../views/chart/index.vue";
import User from "../views/user/index.vue";
import Question from "../views/question/index.vue";
import Enterprise from "../views/enterprise/index.vue";
import Subject from "../views/subject/index.vue";

export default [{
        path: "chart",
        component: Chart,
        meta: {
            title: "数据概览",
            roles: ["管理员", "老师", "超级管理员"],
            fullpath: "/index/chart"
        }
    },
    {
        path: "user",
        component: User,
        meta: {
            title: "用户列表",
            roles: ["管理员", "老师", "超级管理员"],
            fullpath: "/index/user"
        }
    },
    {
        path: "question",
        component: Question,
        meta: {
            title: "题库列表",
            roles: ["管理员", "老师", "学生", "超级管理员"],
            fullpath: "/index/question"
        }
    },
    {
        path: "enterprise",
        component: Enterprise,
        meta: {
            title: "企业列表",
            roles: ["管理员", "超级管理员"],
            fullpath: "/index/enterprise"
        }
    },
    {
        path: "subject",
        component: Subject,
        meta: {
            title: "学科列表",
            roles: ["管理员", "超级管理员"],
            fullpath: "/index/subject"
        }
    }
];
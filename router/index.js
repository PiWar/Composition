import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "../store";
import {usePhoto} from "../composables/Photo";

const {auth} = useAuthStore()
const {getPhoto} = usePhoto()

const routes = [
    {
        path: "/home",
        component: () => import("../view/Home"),
        name: "home",
        meta: {
            auth: true
        },
        children: [
            {
              path: "all",
              name: "all",
              component: () => import("../view/All"),
              meta: {
                  auth: true,
              }
            },
            {
                path: "share",
                name: 'share',
                component: () => import("../view/SharePhoto"),
                meta: {
                    auth: true,
                }
            },
            {
              path: "share_for_you",
              name: "shareForYou",
              component: () => import("../view/ShareForYou"),
              meta: {
                  auth: true,
              }
            },
            {
                path: "update/:id",
                name: "update",
                component: () => import("../view/Update"),
                meta: {
                    auth: true,
                },
                beforeEnter: async (to, from, next) => {
                    if ("id" in to.params){
                        const res = await getPhoto(to.params.id)
                        to.params.photo = res.data
                    }
                    next()
                }
            },
            {
                path: "load",
                name: "load",
                component: () => import("../view/Load"),
                meta: {
                    auth: true,
                }
            }
        ]
    },
    {
        path: "/login",
        component: () => import("../view/Login"),
        name: "login",
    },
    {
        path: "/register",
        component: () => import("../view/Register"),
        name: "register",
    }
]

export const router = createRouter({
    routes,
    history: createWebHistory()
})


router.beforeEach(async (to, from, next) => {
    try {
        const requiresAuth = to.meta.auth ?? false
        if (requiresAuth) {
            const isAuth = auth.isAuth
            if (!isAuth) {
                next({
                    name: "login"
                })
            } else {
                next()
            }
        } else {
            next()
        }
    } catch (e) {
        console.log(e)
        next("/")
    }
})

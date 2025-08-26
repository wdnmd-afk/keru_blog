import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
interface GlobalState {
    user: {
        id: string
        name: string
        admin: boolean
        token: string
    }
}

interface GlobalGetter {
    getUser: () => any
}
interface GlobalSetter {
    setUserInfo: (data: any) => void
}

type GlobalStore = GlobalGetter & GlobalSetter & GlobalState

const useGlobalStore = create<GlobalStore>((set, get) => ({
    user: { id: '', name: '', admin: false, token: '' },
    getUser() {
        return get().user
    },
    setUserInfo: (data) => {
        const user = { ...get().user, ...data }
        set(() => ({ user }))
    },
}))
//将Action抛出
const useGlobalStoreAction = () => {
    return useGlobalStore(
        useShallow((state) => ({
            setUserInfo: state.setUserInfo,
        }))
    )
}

export { useGlobalStore, useGlobalStoreAction }

import { createContext, Dispatch, SetStateAction } from 'react'

type MenuContextType = { menuKey: string; setMenuKey: Dispatch<SetStateAction<string>> }

export const MenuContext = createContext<MenuContextType | null>(null)

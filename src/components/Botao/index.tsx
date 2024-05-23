import React from 'react'
import style from './Botao.module.scss'

interface Props {
  type?: 'button' | 'submit' | 'reset' | undefined
  onCLick?: () => void,
  children?: React.ReactNode
}

export default function Botao({onCLick, type, children}: Props) {
  return (
    <button 
      onClick={onCLick} 
      type={type} 
      className={style.botao}
    >
      {children}
    </button>
  )
};
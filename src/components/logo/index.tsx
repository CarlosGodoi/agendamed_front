import React from "react";
import logo from "../../assets/logo.png";

export const Logo: React.FC = () => {
    return (
        <div className="flex items-center ml-10">
            <div className="w-12 h-12">
                <img src={logo} alt="Imagem do logo Agendamed" />
            </div>
            <p className="text-lg text-secondary font-semibold ml-2">Agenda</p>
            <p className="text-lg text-white font-semibold">Med</p>
        </div>
    )
}
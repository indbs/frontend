import React from 'react';
import TooltipStyle from ".//cssFiles/tooltip.css";
import moment from 'moment';
import 'moment/locale/ru';

function placeInDiv(parameter){
    return <div>{parameter}</div>;
}

export class HtmlToolTip extends React.Component {
    render(){
        var tooltip='';
        if (this.props.toolTipType==="full") {   
            tooltip= (<div className="TooltipStyle">                
                {placeInDiv('Обжиг')}
                {placeInDiv(this.props.toolTipData.PROGRAM_NUMBER)}

                {placeInDiv('Имя программы')}
                {placeInDiv(this.props.toolTipData.PROGRAM_NAME)}    

                {placeInDiv('Длительность')}
                {placeInDiv(this.props.toolTipData.duration)}

                {placeInDiv('Активная мощность')}
                {placeInDiv(this.props.toolTipData.powerkWh)}

                {placeInDiv('Полная мощность')}
                {placeInDiv(this.props.toolTipData.powerVAh)}

                {placeInDiv('Потребление воды')}
                {placeInDiv(this.props.toolTipData.waterQuant)}
                {placeInDiv('Пfepf')}
                {placeInDiv(this.props.toolTipData.pause)}
            </div>)
        }
        if (this.props.toolTipType==="start") {  
            tooltip=                
            <div className="TooltipStyle">                
                {placeInDiv('Начало обжига')}
                {placeInDiv(moment(this.props.toolTipData.STARTUP_TIME).locale("ru").format("Do MMM HH:mm"))}
            </div>    
        }   
        if (this.props.toolTipType==="stop") {  
            tooltip=                
            <div className="TooltipStyle">                
                {placeInDiv('Окончание обжига')}
                {placeInDiv(moment(this.props.toolTipData.end_time).locale("ru").format("Do MMM HH:mm"))}
            </div>    
        }

        if (this.props.toolTipType==="pause") {  
            tooltip=                
            <div className="TooltipStyle">                
                {placeInDiv('Ожидание')}
                {placeInDiv((this.props.toolTipData.pause))}
            </div>    
        }

        if (this.props.toolTipType==="lost") {  
            tooltip=                
            <div className="TooltipStyle">                
                {placeInDiv('Возможная потеря данных')}
               
            </div>    
        }



        return tooltip;   
    }
}

export default HtmlToolTip;
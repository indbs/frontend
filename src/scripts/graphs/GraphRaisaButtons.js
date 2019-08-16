import './style.css';

export class GraphButtons extends React.Component {

  render(){
    return(
      <div className="Buttons" id="chart_div_buttons" style={{'margin-left': '10%'}}>
        <button className="butt"  onClick={this.handleClickCurrents}>   Показать токи</button>
        <button className="butt"  onClick={this.handleClickAirHeaters}> Показать возд. нагреватели</button>
        <button className="butt"  onClick={this.handleClickShort}>      Показать только температуру</button>
        <button className="butt"  onClick={this.handleClickAll}>        Показать всё</button>
      </div>
    )
  }

}
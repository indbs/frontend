import                                         '../style.css';
import React                              from 'react';
import {connect}                          from 'react-redux';
import {
  graph_short_mode_selected,
  graph_air_heaters_mode_selected,
  graph_all_mode_selected,
  graph_currents_mode_selected}           from '../../actions/graph_actions';

export class GraphButtons extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleClickCurrents = () => {
    this.props.dispatch(graph_currents_mode_selected    (this.props.kiln));
  }
  handleClickAirHeaters = () => {
    this.props.dispatch(graph_air_heaters_mode_selected (this.props.kiln));
  }
  handleClickShort = () => {
    this.props.dispatch(graph_short_mode_selected       (this.props.kiln));
  }
  handleClickAll = () => {
    this.props.dispatch(graph_all_mode_selected         (this.props.kiln));
  }

  render(){
    return(
      <div className="Buttons" id="chart_div_buttons" style={{'margin-left': '10%'}}>
        <button className="butt"  onClick={this.handleClickCurrents}>     Показать токи</button>
        <button className="butt"  onClick={this.handleClickAirHeaters}>   Показать возд. нагреватели</button>
        <button className="butt"  onClick={this.handleClickShort}>        Показать только температуру</button>
        <button className="butt"  onClick={this.handleClickAll}>          Показать всё</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  graph_mode_selection: state.graph_mode_selection,
}) 

const mapDispatchToProps = dispatch => ({
  dispatch(params){
    dispatch(params);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(GraphButtons);
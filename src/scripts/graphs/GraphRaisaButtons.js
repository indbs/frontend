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

  render(){
    var butt_st ='short';
    const button_state_preset = this.props.graph_mode_selection.filter((row) => {return row.kiln==this.props.kiln});
    if (button_state_preset.length>0) butt_st = button_state_preset[0].graph_mode;
    return(
      <div className='Buttons' id='chart_div_buttons' style={{'margin-left': '10%'}}>
        <button className={(butt_st=='currents')?   'butt cl':'butt'}  onClick={()=>{this.props.dispatch(graph_currents_mode_selected    (this.props.kiln))}}>Показать токи               </button>
        <button className={(butt_st=='airHeaters')? 'butt cl':'butt'}  onClick={()=>{this.props.dispatch(graph_air_heaters_mode_selected (this.props.kiln))}}>Показать возд. нагреватели  </button>
        <button className={(butt_st=='short')?      'butt cl':'butt'}  onClick={()=>{this.props.dispatch(graph_short_mode_selected       (this.props.kiln))}}>Показать только температуру </button>
        <button className={(butt_st=='all')?        'butt cl':'butt'}  onClick={()=>{this.props.dispatch(graph_all_mode_selected         (this.props.kiln))}}>Показать всё                </button>
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

export function buttonSelectionPreset(buttonStateToFilter, kiln){
  var displayParameter = 'short';
  const gr_mode_preset = buttonStateToFilter.filter((row) => {return row.kiln==kiln});
  if (gr_mode_preset.length>0) displayParameter = gr_mode_preset[0].graph_mode;
  return displayParameter;
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphButtons);
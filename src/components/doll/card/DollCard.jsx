import React from 'react';
import { connect } from 'react-redux';

import './style.css';

class DollCard extends React.Component {
  render() {
    const { id, type, rank, krName } = this.props;
    const typeName = type ? this.props.typeNameMap[type] : null;
    const rankName = this.props.rankNameMap[id > 1000 ? 1 : rank];

    const typeIcon = (typeName && rank) ? require(`./resources/icons/${typeName}_${rankName}.png`) : null;
    const portrait = id ? require(`./resources/portraits/${id}.png`) : null;

    if (!(id && typeName && typeIcon && portrait)) {
      return null;
    }

    return (
      <div className="dollcard undraggable">
        <img className="dollcard--typeicon" src={typeIcon} alt="로딩중입니다" />
        <div className="dollcard--rankbar">
          {
            Array(rank).fill().map((i) => <span key={i} className="dollcard--rankbar--star">★</span>)
          }
        </div>
        <div className="dollcard--portrait" style={{ backgroundImage: `url(${portrait})` }} />
        <div className={`dollcard--namebar ${rankName}`}>{krName}</div>
        <div className="dollcard--no">{id}</div>
      </div>
    );
  }
}

let stateMapper = (state) => {
  return {
    typeNameMap: state.doll.typeNameMap,
    rankNameMap: state.doll.rankNameMap,
  };
};

DollCard = connect(stateMapper)(DollCard);

export default DollCard;
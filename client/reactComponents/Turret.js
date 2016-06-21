import React from 'react';
import Barrel from './Barrel';

class Turret extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 0 0';
    this.rotation = props.rotation || '0 0 0';
    this.turretRadius = props.turretRadius || 1;
    this.barrelLength = props.barrelLength || 5;
    this.activeControl = props.activeControl || false;
    this.material = props.material || 'color: red;';
    this.socket = props.socket;
  }

  componentDidMount() {
    if(this.socket && this.activeControl) {
      this.camera = document.querySelector('#camera').object3D.el;
      window.socket = this.socket;
      setInterval(() => {
        let rotation = this.camera.getAttribute('rotation');
        this.socket.emit('clientPositionUpdate', {
          user:'NOT SET', 
          role: 'turret',
          tankNo: 'NOT SET',
          rotation: rotation,
          absRotation: 'NOT SET'
        });
      }, 1000)
    }
  }

  render () {
    if(this.activeControl) {
      return (
        <a-entity id='turret' position={this.position}>
          <a-sphere // Turret
          position={`0 0 0`}
          rotation='0 0 0' 
          material={this.material}
          radius={1.5}>
            <a-entity id='camera' position={`0 1 0`} 
            rotation={this.rotation}
            camera='near: 0.05' look-controls >
              <Barrel
              position='0 -1 0'
              fireEvent='on: click; callback:handleClick;' 
              material={this.material}/>
            </a-entity>
          </a-sphere>
        </a-entity>
      )
    } else {
      return (
        <a-entity id='turret' position={this.position}>
          <a-sphere // Turret
          position={`0 0 0`}
          rotation='0 0 0' 
          material={this.material}
          radius={1.5}>
            <Barrel
            position='0 0 0'
            // fireEvent='on: click; callback:handleClick;' 
            material={this.material}/>
          </a-sphere>
        </a-entity>
      )
    }
  }
}

module.exports = Turret;

window.handleClick = () => {
  var camera = document.querySelector('#camera').object3D.el;
  window.socket.emit('shotFired', {
    user: 'NOT SET',
    tankNo: 'NOT SET',
    rotation: camera.getAttribute('rotation'),
    tankVel: 'NOT SET',
    absRotation: 'NOT SET'
  });
}

"use strict";

const Homey = require('homey');
const miio = require('miio');

class ZhiMiFanDevice extends Homey.Device {

  onInit() {
    this.createDevice();
    this.setUnavailable(Homey.__('unreachable'));

    // LISTENERS FOR UPDATING CAPABILITIES
    this.registerCapabilityListener('onoff', (value, opts) => {
      if (this.miio) {
        return this.miio.setPower(value);
      } else {
        this.setUnavailable(Homey.__('unreachable'));
        this.createDevice();
        return Promise.reject('Device unreachable, please try again ...');
      }
    });

  }

  onDeleted() {
    clearInterval(this.pollingInterval);
    if (this.miio) {
      this.miio.destroy();
    }
  }

  // HELPER FUNCTIONS
  createDevice() {
    miio.device({
      address: this.getSetting('address'),
      token: this.getSetting('token')
    }).then(miiodevice => {
      if (!this.getAvailable()) {
        this.setAvailable();
      }
      this.miio = miiodevice;

      var interval = this.getSetting('polling') || 60;
      this.pollDevice(interval);
    }).catch((error) => {
      this.log(error);
      this.setUnavailable(Homey.__('unreachable'));
      setTimeout(() => {
        this.createDevice();
      }, 10000);
    });
  }

  pollDevice(interval) {
    clearInterval(this.pollingInterval);

    this.pollingInterval = setInterval(() => {
      (async () => {
        try {
          const power = await this.miio.power();
          const fanspeed = await this.miio.getState('fanSpeed');
          const angle_enable = await this.miio.getState('roll');
          const angle = await this.miio.getState('roll_angle');
          const lock = await this.miio.getState('child_lock');

          if (this.getCapabilityValue('onoff') != power) {
            this.setCapabilityValue('onoff', power);
          }

          if (this.getStoreValue('fanspeed') != fanspeed) {
            this.setStoreValue('fanspeed', fanspeed);
          }

          if (this.getStoreValue('angle_enable') != angle_enable) {
            this.setStoreValue('angle_enable', angle_enable);
          }

          if (this.getStoreValue('angle') != Number(roll_angle)) {
            this.setStoreValue('angle', Number(roll_angle));
          }

          if (this.getStoreValue('child_lock') != child_lock) {
            this.setStoreValue('child_lock', child_lock);
          }

          if (!this.getAvailable()) {
            this.setAvailable();
          }
        } catch (error) {
          this.log(error);
          clearInterval(this.pollingInterval);
          this.setUnavailable(Homey.__('unreachable'));
          setTimeout(() => {
            this.createDevice();
          }, 1000 * interval);
        }
      });
    }, 1000 * interval);
  }
}

module.exports = ZhiMiFanDevice;

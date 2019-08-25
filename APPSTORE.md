# Control Xiaomi Mi Home Wi-Fi devices
Use Homey to control Xiaomi Mi Home devices (the Mi Home Ecosystem is also branded as MiJia). Xiaomi does not officialy support controlling most of it's devices from outside the Mi Home app with the exception of Yeelights. Yeelights can be added to Homey quite easy but for all other devices additional steps are needed that require some technical knowledge setting it up. These steps are described here but Xiaomi can make changes to it's eco system at any time resulting in Homey not being able to control these devices anymore.

This app uses an unofficial library called the [miIO Device Library](https://github.com/aholstenson/miio) for communication with those devices which lack official support for controlling externally, credits go out to the author of this library. This Homey app only adds support for the devices that can be controlled directly through Wi-Fi (there is another app for directly controlling Xiaomi ZigBee sensors).

## Supported devices
Below is a list of supported devices and devices. Post a comment in the [support topic](https://forum.athom.com/discussion/3295/) if you would like to see support for a specific device, some devices might already be supported by the miio library but just need to be implemented. For devices not yet support by the miio library you need technical knowledge to discover the device properties yourself as described [here](https://github.com/aholstenson/miio/blob/master/docs/missing-devices.md).
* Yeelights: Bulbs Wi-Fi, LED strips, Bedside Lamp II, Ceiling Lights, Desk Lamp
* Xiaomi Philips Light Bulbs
* Philips Eyecare Light
* Xiaomi Robot Vacuum Cleaner V1 and V2/S50, S6
* Xiaomi Air Purifiers 2, 2S and Pro
* Xiamomi Humidifier v1 & v2
* Xiaomi Single Power Plug and Power Strip WiFi version
* Xiaomi PM2.5 Air Monitor
* Xiaomi Gateway Light & Alarm - subdevices are supported directly with the Xiaomi ZigBee app

## Support topic
For support please use the official support topic on the forum [here](https://community.athom.com/t/118).

## Adding Yeelights
This Homey app supports direct control for Yeelights. Before being able to add your Yeelights as devices in Homey you will need to enable the "Developer Mode" or "LAN control" in the official Yeelight app. You can do this by using the official Yeelight app on your smartphone (not the Xiaomi Mi Home app but the actual Yeelight app). In this app go into the settings of your bulb and you will see a menu item called Developer Mode. This contains a toggle to enable the developer mode. After enabling this the Homey app will be able to autodiscover your bulb when adding it as new device.

## Adding miIO devices
For Homey to be able to communicate with devices over the miIO protocol a unique device token needs to be obtained. Technical knowledge is needed for retrieving these tokens. If your are not to tech-savvy using this app for any other devices than the Yeelights might be challenging. See the instructions [here](https://github.com/jghaanstra/com.xiaomi-miio/blob/master/docs/obtain_token.md) on retrieving device tokens.

## Using Target and Zone Cleanup for Xiaomi Mi Robot
Xiaomi has released an update for the vacuum cleaners that enables zone cleaning and goto function. Using the action cards that utilize these functions are a bit challenging. If you want to use these cards please read the instructions [here](https://github.com/jghaanstra/com.xiaomi-miio/blob/master/docs/mirobot_zonecleanup.md).

## Changelog
### v2.12.2 - 2019-08-14
* FIX: possible fixes on ocassional crashes related to network connectivity of Miio device and Yeelights
* FIX: better checks for setting capabilities on Yeelights (make sure a Yeelights has that capability)

const {Gio, Gtk, GObject, Secret} = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Utils = Me.imports.utils;

const PANEL_ICON_PATH = "default-panel-icon";
const VALID_PANEL_ICONS = 'valid-panel-icons';
const HASS_ACCESS_TOKEN = 'hass-access-token';
const HASS_URL = 'hass-url';
const HASS_TOGGLABLE_ENTITIES = 'hass-togglable-entities';
const HASS_ENABLED_ENTITIES = 'hass-enabled-entities';
const HASS_PANEL_SENSOR_IDS = 'hass-panel-sensor-ids';
const HASS_ENABLED_SENSOR_IDS = 'hass-enabled-sensor-ids';
const MyUUID = Me.metadata.uuid;
// const HASS_SHORTCUT = 'hass-shortcut';
const SHOW_NOTIFICATIONS_KEY = 'show-notifications';
const SHOW_WEATHER_STATS = 'show-weather-stats';
const SHOW_HUMIDITY = 'show-humidity';
const TEMPERATURE_ID = 'temp-entity-id';
const HUMIDITY_ID = 'humidity-entity-id';
const DO_REFRESH = 'refresh-weather';
const REFRESH_RATE = 'weather-refresh-seconds';

var MscOptions = class MscOptions {
    constructor() {
        this._gsettings = Utils.getSettings();
        this._connectionIds = [];
    }

    connect(name, callback) {
        const id = this._gsettings.connect(name, callback);
        this._connectionIds.push(id);
        return id;
    }

    destroy() {
        this._connectionIds.forEach(id => this._gsettings.disconnect(id));
    }

    // Panel Icons
    get panelIcon() {
        return this._gsettings.get_string(PANEL_ICON_PATH);
    }
    set panelIcon(icon_path) {
        this._gsettings.set_string(PANEL_ICON_PATH, icon_path);
    }
    get validIcons() {
        return this._gsettings.get_strv(VALID_PANEL_ICONS);
    }
    set validIcons(icon_paths) {
        this._gsettings.set_strv(VALID_PANEL_ICONS, icon_paths);
    }

    // General Settings
    get hassUrl() {
        return this._gsettings.get_string(HASS_URL);
    }
    set hassUrl(bool_val) {
        this._gsettings.set_string(HASS_URL, bool_val);
    }

    get tempHumi() {
        return this._gsettings.get_boolean(SHOW_WEATHER_STATS);
    }
    set tempHumi(bool_val) {
        this._gsettings.set_boolean(SHOW_WEATHER_STATS, bool_val);
    }

    get showHumidity() {
        return this._gsettings.get_boolean(SHOW_HUMIDITY);
    }
    set showHumidity(bool_val) {
        this._gsettings.set_boolean(SHOW_HUMIDITY, bool_val);
    }

    get temperatureId() {
        return this._gsettings.get_string(TEMPERATURE_ID);
    }
    set temperatureId(tempId) {
        this._gsettings.set_string(TEMPERATURE_ID, tempId);
    }

    get humidityId() {
        return this._gsettings.get_string(HUMIDITY_ID);
    }
    set humidityId(humiId) {
        this._gsettings.set_string(HUMIDITY_ID, humiId);
    }

    get doRefresh() {
        return this._gsettings.get_boolean(DO_REFRESH);
    }
    set doRefresh(bool_val) {
        this._gsettings.set_boolean(DO_REFRESH, bool_val);
    }

    get refreshRate() {
        return this._gsettings.get_string(REFRESH_RATE);
    }
    set refreshRate(rate) {
        this._gsettings.set_string(REFRESH_RATE, humiId);
    }

    // Entities cache
    get entitiesCache() {
        return this._gsettings.get_strv(HASS_ENTITIES_CACHE).map(ent => JSON.parse(ent));
    }
    set entitiesCache(entities) {
        this._gsettings.set_strv(HASS_ENTITIES_CACHE, entities.map(ent => JSON.stringify(ent)));
    }

    // Togglable entities of menu
    get enabledEntities() {
        return this._gsettings.get_strv(HASS_ENABLED_ENTITIES);
    }
    set enabledEntities(entities) {
        this._gsettings.set_strv(HASS_ENABLED_ENTITIES, entities);
    }

    // Panel extra sensors
    get enabledSensors() {
        return this._gsettings.get_strv(HASS_ENABLED_SENSOR_IDS);
    }
    set enabledSensors(entities) {
        this._gsettings.set_strv(HASS_ENABLED_SENSOR_IDS, entities);
    }

}

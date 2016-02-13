/**
 * 一个微型事件发布/订阅模块
 * @author  margox
 * @version 1.0.0
 * @date    2016/02
 */

(function(root, factory){

    /*
     * 添加UMD支持
     */
    if (typeof exports === 'object') {
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.Eventer = factory();
    }

})(window, function() {

    'use strict';

    /**
     * 构造函数
     * @param {object} object 需要绑定Eventer功能的对象
     */
    function Eventer(object) {

        if (typeof object !== 'object' || object instanceof Eventer || object.__events || object.on || object.off || object.trigger) {
            throw 'Unable to bind object to Eventer.';
            return false;
        }


        object.__events = {};
        object.on       = this.__on;
        object.off      = this.__off;
        object.trigger  = this.__trigger;

    }

    /**
     * 用来注册事件，可单个或者多个
     * @param  {string | object} eventName 事件名，注册单个事件时为一个字符串，注册多个事件则需要传入一个包含事件名/函数的键值对
     * @param  {function} method 事件函数，仅注册单个事件时才需要
     * @return {object} 返回自身以便于链式调用
     */
    Eventer.prototype.__on = function(eventName, method) {

        var __event;

        if (typeof eventName === "object") {

            for (__event in eventName) {
                if (Object.prototype.hasOwnProperty.call(eventName, __event) && (typeof eventName[__event] === "function")) {
                    this.on(__event, eventName[__event]);
                }
            }

        } else if (typeof eventName === "string" && typeof method === "function") {

            this.__events[eventName] || (this.__events[eventName] = []);
            this.__events[eventName].push(method);

        }

        return this;

    }

    /**
     * 删除一个指定的事件队列
     * @param  {string} eventName 需要删除的事件名
     * @return {object} 返回自身以便于链式调用
     */
    Eventer.prototype.__off = function(eventName) {

        if (typeof eventName === 'string') {
            this.__events[eventName] = [];
        }

        return this;

    }

    /**
     * 用于触发一个指定的事件
     * @param {string | ...any} 传入的第一个参数为需要触发的事件明，其后的参数会传递给事件队列中的每个函数
     * @return {object} 返回自身以便于链式调用
     */
    Eventer.prototype.__trigger = function() {

        var __eventName = Array.prototype.shift.call(arguments),
            __arguments = arguments,
            __returnFalse = false,
            __that = this,
            __return;

        if (typeof __eventName === 'string' && Object.prototype.hasOwnProperty.call(this.__events, __eventName) && (this.__events[__eventName] instanceof Array)) {

            this.__events[__eventName].forEach(function(method) {
                __return = method.apply(__that, __arguments);
                __return === false && (__returnFalse = true);
            });

        }

        return __returnFalse ? false : this;

    }

    /**
     * 执行实例化
     * @param  {object} object 需要绑定Eventer功能的对象
     */
    return function (object) {
        new Eventer(object);
    }

});
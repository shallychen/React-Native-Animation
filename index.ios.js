/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
// import posed from 'react-native-pose';
import {
    AppRegistry,
    StyleSheet,
    
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform,

    Animated,
    Easing,
} from 'react-native';

export default class agolet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeOut: new Animated.Value(1),
            bounceValue: new Animated.Value(1.2), // 设置一个较大的初始值
            translateValue: new Animated.Value(5), // 二维坐标
            rotateValue: new Animated.Value(0),
            borderRadius: new Animated.Value(4),
            translateShadow: new Animated.Value(-35)
        };
    }

    fadeInOut() {
        this.state.fadeOut.setValue(.3);
        Animated.sequence([
            Animated.timing(this.state.fadeOut, {
                toValue: 1,
                duration: 800,
                easing: Easing.linear,// 线性的渐变函数
            }),
            Animated.timing(this.state.fadeOut, {
                toValue: .3,
                duration: 400,
                easing: Easing.linear,// 线性的渐变函数
            }),
        ]).start(() => {  
            this.fadeInOut();
        }) 
    }

    bounce() {
        this.state.bounceValue.setValue(1.2); // 设置一个较大的初始值
        this.state.rotateValue.setValue(0);


        Animated.sequence([
            //  组合动画 parallel（同时执行）、sequence（顺序执行）、stagger（错峰，其实就是插入了delay的parrllel）和delay（延迟）decay以一个初始速度开始并且逐渐减慢停止。
            Animated.spring( //  基础的单次弹跳物理模型
                this.state.bounceValue, {
                    toValue: 1,
                    friction: 1,// 摩擦力，默认为7.
                    tension: 40,// 张力，默认40。
            }), 
                // Animated.delay(2000), // 配合sequence，延迟2秒
                // Animated.timing( // 从时间范围映射到渐变的值。
                //     this.state.rotateValue, {
                //         toValue: 1,
                //         duration: 800,// 动画持续的时间（单位是毫秒），默认为500
                //         easing: Easing.out(Easing.quad),// 一个用于定义曲线的渐变函数
                //         delay: 0,// 在一段时间之后开始动画（单位是毫秒），默认为0。
                //     }
                // ), 
                // Animated.decay( // 以一个初始速度开始并且逐渐减慢停止。  S=vt-（at^2）/2   v=v - at
                //     this.state.translateValue, {
                //         velocity: 10,// 起始速度，必填参数。
                //         deceleration: 0.8,// 速度衰减比例，默认为0.997。
                //     }
                // ),
            // Animated.timing(this.state.fadeOutOpacity, {
            //     toValue: 0,
            //     duration: 2000,
            //     easing: Easing.linear,// 线性的渐变函数
            // })
        ]).start(() => {                          //每一个动画结束后的回调  
            this.bounce();  //循环动画
        }) 
    }

    translateValue() {
        this.state.translateValue.setValue(0);
        Animated.sequence([
            Animated.spring(
                this.state.translateValue, {
                    toValue: 5,
                    friction: 1,
            }),
        ]).start(() => {  
            this.translateValue();
        }) 
    }

    rotateValue() {
        this.state.rotateValue.setValue(0);
        Animated.sequence([
            Animated.timing( // 从时间范围映射到渐变的值。
                this.state.rotateValue, {
                    toValue: 1,
                    duration: 800,// 动画持续的时间（单位是毫秒），默认为500
                    easing: Easing.out(Easing.quad),// 一个用于定义曲线的渐变函数
                    delay: 200,// 在一段时间之后开始动画（单位是毫秒），默认为0。
                }
            ), 
        ]).start(() => {
            this.rotateValue();
        }) 
    }

    translateShadow() {
        this.state.translateShadow.setValue(-35);
        Animated.timing(this.state.translateShadow, {
            toValue: 35,
            duration: 1000,
            easing: Easing.linear,// 线性的渐变函数
        }).start(() => {  
            this.translateShadow();
        }) 
    }
  
    componentDidMount() {
        this.fadeInOut();
        this.bounce();
        this.translateValue();
        this.rotateValue();
        this.translateShadow();
    }

    render() {
        console.log(this.state.translateValue)
        return (
            <View style={[styles.container]}>
                <TouchableOpacity
                    style={[styles.button]}
                    activeOpacity={0.8}
                    // onPress={showComfortModal}
                >
                    <Text style={[styles.buttonText]}>订</Text>
                </TouchableOpacity>

                {/* fadeOut */}
                <Animated.View
                    style={[styles.button, {opacity: this.state.fadeOut}]}
                > 
                    <Text style={[styles.buttonText]}>订</Text>
                </Animated.View>

                {/* bounce */}
                <Animated.View
                    style={[styles.button, {
                        transform: [  
                            {scale: this.state.bounceValue},
                        ]
                    }]}
                > 
                    <Text style={[styles.buttonText]}>订</Text>
                </Animated.View>

                {/* translate */}
                <Animated.View
                    style={[styles.button, {
                        transform: [ 
                            {translateY: this.state.translateValue}, // x轴移动
                        ]
                    }]}
                > 
                    <Text style={[styles.buttonText]}>订</Text>
                </Animated.View>

                <Animated.View
                    style={[styles.button, {
                        borderRadius: this.state.borderRadius,
                        transform: [
                            {rotate: this.state.rotateValue.interpolate({ // 旋转，使用插值函数做值映射
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']})},
                        ]
                    }]}
                > 
                    <Text style={[styles.buttonText]}>订</Text>
                </Animated.View>

                {/* rotate */}
                <Animated.View
                    style={[styles.button]}
                >   
                    <Animated.View 
                        style={[styles.shadow, {
                            transform: [
                                {rotate: '25deg'},
                                {translateX: this.state.translateShadow}
                            ],
                        }]}
                    />
                    <Text style={[styles.buttonText]}>订</Text>
                </Animated.View>
            </View>
        );
    }
}



var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    baseText :{
        color: "#333333"
    },
    
    button: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: 44,
        height: 44,
        marginBottom: 10,
        borderRadius: 4,
        backgroundColor: '#FF7528',
        // borderStyle: 'solid',
        // borderColor: '#FF7528',
        // borderWidth: 1
    },
    buttonText : {
        position: 'relative',
        zIndex: 2,
        color: '#fff',
        fontSize: 18,
        backgroundColor: 'transparent'
    },
    shadow: {
        position: 'absolute',
        zIndex: 0,
        width: 15,
        height: 80,
        backgroundColor: 'rgba(255, 255, 255, .25)',
    }
});

AppRegistry.registerComponent('agolet', () => agolet);

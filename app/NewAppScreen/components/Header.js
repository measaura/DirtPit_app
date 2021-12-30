/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict';
import Colors from './Colors';
import  {Node} from 'react';
import {Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';

const Header = () => (
  <ImageBackground
    accessibilityRole={'image'}
    source={require('./logo.png')}
    style={styles.background}
    imageStyle={styles.logo}>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    paddingBottom: 140,
    paddingTop: 0,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
  logo: {
    opacity:1,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    margin:0,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.white,
  },
});

export default Header;

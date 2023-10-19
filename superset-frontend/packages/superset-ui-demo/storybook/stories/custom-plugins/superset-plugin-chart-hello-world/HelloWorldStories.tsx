/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';

import { SupersetPluginChartHelloWorld } from 'superset-plugin-chart-hello-world';

import { select } from '@storybook/addon-knobs';
import { SuperChart } from '@superset-ui/core';

import data from './data';

export default {
  title: 'Custom Plugins/hello-world',
};

new SupersetPluginChartHelloWorld()
  .configure({
    key: 'ext-hello-world',
  })
  .register();

export const HelloWorldStories = () => (
  <SuperChart
    chartType="ext-hello-world"
    datasource={{
      columnFormats: {},
    }}
    width="100%"
    height="100%"
    queriesData={[data]}
    formData={{
      encoding: {
        color: {
          field: 'name',
        },
        fontSize: {
          field: 'sum__num',
          scale: {
            range: [0, 70],
            zero: true,
          },
          type: 'quantitative',
        },
        text: {
          field: 'name',
        },
      },
      metric: 'sum__num',
      rotation: select('Rotation', ['square', 'flat', 'random'], 'flat'),
      series: 'name',
    }}
  />
);

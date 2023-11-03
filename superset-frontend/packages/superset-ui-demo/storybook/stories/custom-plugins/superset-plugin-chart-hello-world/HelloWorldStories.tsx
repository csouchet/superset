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

import { SupersetPluginChartHelloWorld } from '@superset-ui/superset-plugin-chart-hello-world';

import { SuperChart } from '@superset-ui/core';

import testData from './data';

const TIME_COLUMN = '__timestamp';

const formData = {
  colorPicker: {
    r: 0,
    g: 122,
    b: 135,
    a: 1,
  },
  compareLag: 1,
  compareSuffix: 'over 10Y',
  metric: 'sum__num',
  showTrendLine: true,
  startYAxisAtZero: true,
  timeGrainSqla: 'P1Y',
  vizType: 'big_number',
  yAxisFormat: '.3s',
};

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
    width="100%"
    height="100%"
    queriesData={[
      {
        data: testData.slice(0, 9),
        from_dttm: testData[testData.length - 1][TIME_COLUMN],
        to_dttm: testData[0][TIME_COLUMN],
      },
    ]}
    formData={{
      ...formData,
      timeRangeFixed: false,
    }}
  />
);

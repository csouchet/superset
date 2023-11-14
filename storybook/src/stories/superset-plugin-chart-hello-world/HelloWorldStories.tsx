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

import { SupersetPluginChartHelloWorld } from '@superset-ui/custom-plugin-chart-hello-world';

import { SuperChart } from '@superset-ui/core';
import { select } from '@storybook/addon-knobs';

import testData from './data';

const TIME_COLUMN = '__timestamp';

const formData = {
  processName: 'process',
  bpmnDiagram: 'diagram',
};

export default {
  title: 'Custom Plugins/hello-world',
};

new SupersetPluginChartHelloWorld()
  .configure({
    key: 'ext-hello-world',
  })
  .register();

export const HelloWorldStories = () => {
  const dataIndex: number = select(
    'Data Index',
    Array.from({ length: testData.length }, (_, index) => index),
    0,
  );
  let processes: string[] = Array.from(
    new Set(testData.map(item => item.process)),
  );
  // @ts-ignore
  processes.push(undefined);
  const process: string = select('Process Name', processes, 'Pizza Customer');
  //const activityName: string = text('Activity Name', undefined);
  return (
    <SuperChart
      chartType="ext-hello-world"
      width="100%"
      height="100%"
      queriesData={[
        {
          data: [
            {
              diagram: testData[dataIndex].diagram,
              process: process ?? testData[dataIndex].process,
            },
          ],
          from_dttm: testData[testData.length - 1][TIME_COLUMN],
          to_dttm: testData[0][TIME_COLUMN],
        },
      ]}
      formData={{
        ...formData,
        /*diagramURL: diagramURL,
      processName: processName,
      activityName: activityName,*/
        //theme: theme
      }}
    />
  );
};

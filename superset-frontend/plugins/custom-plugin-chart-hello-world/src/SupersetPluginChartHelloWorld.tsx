/**
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
import React, { createRef, useEffect, useState } from 'react';

import {
  BpmnVisualization,
  FitType,
  ModelFilter,
  PoolFilter,
} from 'bpmn-visualization';

import { styled } from '@superset-ui/core';

import {
  SupersetPluginChartHelloWorldProps,
  SupersetPluginChartHelloWorldStylesProps,
} from './types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<SupersetPluginChartHelloWorldStylesProps>`
  /*background-color: ${({ theme }) => theme.colors.secondary.light2};
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;*/

  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function SupersetPluginChartHelloWorld(
  props: SupersetPluginChartHelloWorldProps,
) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width, processName, bpmnDiagram } = props;

  const rootElem = createRef<HTMLDivElement>();

  const [bpmnVisualization, initBpmnVisualization] =
    useState<BpmnVisualization | null>(null);

  // first init
  useEffect(() => {
    const init = new BpmnVisualization({
      container: 'bpmn-container',
      navigation: { enabled: true },
    });
    initBpmnVisualization(init);
  }, []);

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  // each props change
  useEffect(() => {
    if (bpmnVisualization) {
      //const root = rootElem.current as HTMLElement;
      //console.log('Plugin element', root);
      //console.log('data', data);
      const modelFilter: ModelFilter = {};
      const process = data[0][processName];
      const diagram = data[0][bpmnDiagram];

      if (diagram && (diagram as string).trim() !== '') {
        if (process && (process as string).trim() !== '') {
          modelFilter.pools = { name: process } as PoolFilter;
        }
        bpmnVisualization.load(diagram as string, {
          fit: {
            type: FitType.Center,
            margin: 0,
          },
          modelFilter: modelFilter,
        });
      }
    }
  });

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      <div
        id="bpmn-container"
        style={{
          /* height: `calc(${height} - 0.5rem)`,
          width: `calc(${width} - 0.5rem)`,
          padding: 'auto', */
          height,
          width,
          /* This ensures that the parts of the diagram outside the container are not displayed. */
          overflow: 'hidden',
          // eslint-disable-next-line theme-colors/no-literal-colors
          backgroundColor: 'white',
        }}
      />
    </Styles>
  );
}

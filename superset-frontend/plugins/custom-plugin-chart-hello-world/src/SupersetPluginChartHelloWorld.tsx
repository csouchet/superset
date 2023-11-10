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
import React, { createRef, useEffect } from 'react';

import {
  BpmnVisualization,
  FitType,
  FlowKind,
  ModelFilter,
  PoolFilter,
  ShapeBpmnElementKind,
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

  h3 {
    /* You can use your props to control CSS! */
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) =>
      theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) =>
      theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  pre {
    height: ${({ theme, headerFontSize, height }) =>
      height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]}px;
  }
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
  // @ts-ignore
  const { data, height, width } = props;

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    //const root = rootElem.current as HTMLElement;
    //console.log('Plugin element', root);
    //console.log('data', data);

    const bpmnVisualization = new BpmnVisualization({
      container: 'bpmn-container',
      navigation: { enabled: true },
    });

    const modelFilter: ModelFilter = {};

    if (data[0].process && (data[0].process as string).trim() !== '') {
      modelFilter.pools = { name: data[0].process } as PoolFilter;
    }
    bpmnVisualization.load(data[0].diagram as string, {
      fit: {
        type: FitType.Center,
        margin: 0,
      },
      modelFilter: modelFilter,
    });

    const { bpmnElementsRegistry } = bpmnVisualization;
    const catchEventIds = bpmnElementsRegistry
      .getElementsByKinds(ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH)
      .map(element => element.bpmnSemantic.id);
    bpmnElementsRegistry.updateStyle(catchEventIds, {
      // eslint-disable-next-line theme-colors/no-literal-colors
      stroke: { color: 'chartreuse' },
      // eslint-disable-next-line theme-colors/no-literal-colors
      fill: { color: '#102000' },
    });

    const messageFlowIds = bpmnElementsRegistry
      .getElementsByKinds(FlowKind.MESSAGE_FLOW)
      .map(element => element.bpmnSemantic.id);
    bpmnElementsRegistry.updateStyle(messageFlowIds, {
      // eslint-disable-next-line theme-colors/no-literal-colors
      stroke: { color: '#8000FF' },
      // eslint-disable-next-line theme-colors/no-literal-colors
      fill: { color: '#EFDFFF' },
    });
  });

  console.log('Plugin props', props);

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      {/* <pre>${JSON.stringify(data, null, 2)}</pre> */}

      <div
        id="bpmn-container"
        style={{
          /* height: `calc(${height} - 0.5rem)`,
          width: `calc(${width} - 0.5rem)`,
          padding: 'auto', */

          height,
          width,
          /* This ensures that the parts of the diagram outside of the container are not displayed. */
          overflow: 'hidden',
          // eslint-disable-next-line theme-colors/no-literal-colors
          backgroundColor: 'white',
        }}
      />
    </Styles>
  );
}

/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Component, OnInit } from '@angular/core';
import { BaseWidgetConfig } from '../../base/base-widget-config';
import { ImageWidgetModel, ImageWidgetVisConfig } from '../model/image-widget.model';
import { WidgetType } from '../../../../registry/data-explorer-widgets';

@Component({
  selector: 'sp-data-explorer-image-widget-config',
  templateUrl: './image-widget-config.component.html',
  styleUrls: ['./image-widget-config.component.scss']
})
export class ImageWidgetConfigComponent extends BaseWidgetConfig<ImageWidgetModel, ImageWidgetVisConfig> implements OnInit {

  ngOnInit(): void {
  }

  protected getWidgetType(): WidgetType {
    return WidgetType.Image;
  }

  protected initWidgetConfig(): ImageWidgetVisConfig {
    return {
      forType: this.getWidgetType(),
      selectedField: this.fieldProvider.allFields[0]
    };
  }

}

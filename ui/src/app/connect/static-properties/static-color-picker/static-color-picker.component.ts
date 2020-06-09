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

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ConfigurationInfo} from "../../model/message/ConfigurationInfo";
import {StaticPropertyUtilService} from "../static-property-util.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AbstractStaticPropertyRenderer} from "../base/abstract-static-property";
import {ColorPickerStaticProperty} from "../../../core-model/gen/streampipes-model";

@Component({
    selector: 'app-static-color-picker',
    templateUrl: './static-color-picker.component.html',
    styleUrls: ['./static-color-picker.component.css']
})
export class StaticColorPickerComponent
    extends AbstractStaticPropertyRenderer<ColorPickerStaticProperty> implements OnInit {

    constructor(public staticPropertyUtil: StaticPropertyUtilService){
        super();
    }

    @Output() updateEmitter: EventEmitter<ConfigurationInfo> = new EventEmitter();

    @Output() inputEmitter: EventEmitter<any> = new EventEmitter<any>();

    inputValue: String;
    hasInput: Boolean;
    colorPickerForm: FormGroup;

    presetColors: Array<any> = ["#39B54A", "#1B1464", "#f44336", "#4CAF50", "#FFEB3B", "#FFFFFF", "#000000"];

    ngOnInit() {
        this.colorPickerForm = new FormGroup({
            'colorPickerStaticProperty': new FormControl(this.inputValue, [
                Validators.required
            ]),
        })
        this.inputEmitter.emit(true);
    }

    valueChange(inputValue) {
        this.inputValue = inputValue;
        if (inputValue == "" || !inputValue) {
            this.hasInput = false;
        } else {
            this.hasInput = true;
        }

        this.inputEmitter.emit(this.hasInput);

    }

    emitUpdate() {
        this.updateEmitter.emit(new ConfigurationInfo(this.staticProperty.internalName, this.staticPropertyUtil.asColorPickerStaticProperty(this.staticProperty).selectedColor && this.staticPropertyUtil.asColorPickerStaticProperty(this.staticProperty).selectedColor !== ""));
    }

}
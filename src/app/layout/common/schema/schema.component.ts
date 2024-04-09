import { NgFor, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit,Input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SettingsComponent } from '../settings/settings.component';
import {FuseConfig, FuseConfigService, Scheme } from '@fuse/services/config';

@Component({
  selector: 'schema',
  templateUrl: './schema.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs       : 'schema',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatMenuModule, NgTemplateOutlet, NgFor,MatIconModule,SettingsComponent,MatTooltipModule]
})
export class SchemaComponent implements OnInit, OnDestroy{
  config: FuseConfig;
  scheme: 'dark' | 'light';
  @Input() tooltip: string;
  constructor(private _fuseConfigService: FuseConfigService,) {
      
  }

  ngOnInit(): void
    {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {

    }
    setScheme(scheme: Scheme): void
    {
        this._fuseConfigService.config = {scheme};
    }
}

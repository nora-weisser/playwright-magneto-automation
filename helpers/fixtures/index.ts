import { mergeTests } from '@playwright/test';
import { test as POMFixture} from './pom.fixture';
import {test as adBlockFixture} from './adblock.fixture'

export const test = mergeTests(POMFixture, adBlockFixture);

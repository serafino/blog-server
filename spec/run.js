import Jasmine from 'jasmine';
import { SpecReporter } from 'jasmine-spec-reporter';

const jasmine = new Jasmine();
jasmine.loadConfigFile('spec/support/jasmine.json');

jasmine.addReporter(new SpecReporter({
  spec: { displayPending: true },
}));

jasmine.execute();

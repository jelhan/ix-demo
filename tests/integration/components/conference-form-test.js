import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | conference-form', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('model', {
      name: 'enterJS 2018',
      startDate: '2018-06-19',
      endDate: '2018-06-22',
      address: 'Schloßgraben 1, 64283 Darmstadt'
    });
  });

  test('input elements are prefilled with current values of model', async function(assert) {
    await render(hbs`<ConferenceForm @conference={{this.model}} />`);
    assert.dom('[data-test-element="name"] input').hasValue(this.get('model.name'));
    assert.dom('[data-test-element="start-date"] input').hasValue(this.get('model.startDate'));
    assert.dom('[data-test-element="end-date"] input').hasValue(this.get('model.endDate'));
    assert.dom('[data-test-element="address"] input').hasValue(this.get('model.address'));
  });

  test('onSave event receives user input', async function(assert) {
    this.set('saveAction', (data) => {
      assert.step('save action');
      assert.deepEqual(data, this.get('model'), 'filled in values are passed to save action');
    });
    await render(hbs`<ConferenceForm @conference={{hash}} @onSave={{saveAction}} />`);
    await fillIn('[data-test-element="name"] input', this.get('model.name'));
    await fillIn('[data-test-element="start-date"] input', this.get('model.startDate'));
    await fillIn('[data-test-element="end-date"] input', this.get('model.endDate'));
    await fillIn('[data-test-element="address"] input', this.get('model.address'));
    await click('[data-test-button="submit"]');
    assert.verifySteps(['save action'], 'save action has been exectued');
  });
});

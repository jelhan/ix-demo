import { module, test } from 'qunit';
import { visit, currentURL, findAll, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | conferences', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('list existing conferences', async function(assert) {
    let existingConf = server.create('conference', {
      name: 'JSConf EU',
      startDate: '2019-06-01',
      endDate: '2019-06-02',
      address: 'Eichenstraße 4, 12435 Berlin, Germany'
    });

    await visit('/');
    assert.equal(currentURL(), '/', 'allows to visit index page');
    assert.equal(findAll('table tbody tr').length, 1, 'shows one conference');
    assert.dom(`[data-test-conference="${existingConf.id}"] [data-test-column="name"]`).hasText(existingConf.name);
    assert.dom(`[data-test-conference="${existingConf.id}"] [data-test-column="period"]`).hasText('1. - 2. Juni 2019');
    assert.dom(`[data-test-conference="${existingConf.id}"] [data-test-column="address"]`).hasText(existingConf.address);
  });

  test('create a new conference', async function(assert) {
    let newConf = {
      name: 'c\'t <webdev>',
      startDate: '2019-02-06',
      endDate: '2019-02-08',
      address: 'Im Mediapark 7, 50670 Köln'
    };

    await visit('/');
    await click('[data-test-button="new"]');
    assert.equal(currentURL(), '/new', 'transitioned to conference create page');

    await fillIn('[data-test-element="name"] input', newConf.name);
    await fillIn('[data-test-element="start-date"] input', newConf.startDate);
    await fillIn('[data-test-element="end-date"] input', newConf.endDate);
    await fillIn('[data-test-element="address"] input', newConf.address);
    await click('[data-test-button="submit"]');
    assert.equal(currentURL(), '/', 'transitioned to index page after form was submitted successfully');
    let persistedConf = server.db.conferences.findBy(newConf);
    assert.ok(persistedConf, 'conference has been persisted');
    assert.dom(`[data-test-conference="${persistedConf.id}"] [data-test-column="name"]`).hasText(newConf.name);
    assert.dom(`[data-test-conference="${persistedConf.id}"] [data-test-column="period"]`).hasText('6. - 8. Februar 2019');
    assert.dom(`[data-test-conference="${persistedConf.id}"] [data-test-column="address"]`).hasText(newConf.address);
  });

  test('edit a conference', async function(assert) {
    let existingConf = server.create('conference', {
      name: 'JSConf EU',
      startDate: '2019-06-01',
      endDate: '2019-06-02',
      address: 'Eichenstraße 4, 12435 Berlin, Germany'
    });
    let updatedAddress = 'Eichenstraße 4, 12435 Berlin';

    await visit('/');

    await click(`[data-test-conference="${existingConf.id}"] [data-test-button="edit"]`);
    assert.equal(currentURL(), `/edit/${existingConf.id}`, 'click on edit button transitions to conference edit page');

    await fillIn('[data-test-element="address"] input', updatedAddress);
    await click('[data-test-button="submit"]');
    assert.equal(currentURL(), '/', 'transitioned to index page after form was submitted successfully');
    assert.dom(`[data-test-conference="${existingConf.id}"] [data-test-column="address"]`).hasText(updatedAddress);
    assert.equal(server.db.conferences.find(existingConf.id).address, updatedAddress, 'updated address is persisted');
  });

  test('delete a conference', async function(assert) {
    let existingConf = server.create('conference', {
      name: 'JSConf EU',
      startDate: '2019-06-01',
      endDate: '2019-06-02',
      address: 'Eichenstraße 4, 12435 Berlin, Germany'
    });

    await visit('/');
    assert.dom(`[data-test-conference="${existingConf.id}"]`).exists('assumption: shows conference before');
    assert.ok(server.db.conferences.find(existingConf.id), 'assumption: conference exists before');

    await click(`[data-test-conference="${existingConf.id}"] [data-test-button="delete"]`);
    assert.dom(`[data-test-conference="${existingConf.id}"]`).doesNotExist('conference has been removed from table');
    assert.notOk(server.db.conferences.find(existingConf.id), 'conference has been deleted on server');
  });
});

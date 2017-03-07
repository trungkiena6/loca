'use strict';

import logger from 'winston';
import Model from './model';
import OF from './objectfilter';

class AccountModel extends Model {
    constructor() {
        super('accounts');
        this.schema = new OF({
            email: String,
            password: String,
            firstname: String,
            lastname: String,
            creation: String
        });
    }

    findOne(email, callback) {
        super.findFilter(null, {
            email: email.toLowerCase()
        }, (errors, accounts) => {
            if (errors) {
                callback(errors);
            } else if (!accounts || accounts.length === 0) {
                callback(null, null);
            } else {
                callback(null, accounts[0]);
            }
        });
    }

    add(item, callback) {
        super.add(null, item, callback);
    }

    findAll() {
        logger.error('method not implemented!');
    }
}

export default new AccountModel();

require 'sinatra'
require 'slim'
require 'slim/include'
require 'rack-ssl-enforcer'
require 'json'
require 'csv'
require 'tilt/kramdown'
require 'ap'

# The Nigerian Poverty Profile visualizer
class WhoRulesNigeria < Sinatra::Base
  ng_all = File.open('./data/maps/ng-all.json')
  ng_all = JSON.load ng_all
  ng_all = ng_all.to_json

  state_guber = {}
  state_legislature = {}

  CSV.foreach('./data/csv/guber_legislature.csv')
    .each_with_index do |row, index|
    next if index == 0
    state_guber[row[2]] ||= []
    state_guber[row[2]] << [row[0], row[1]]
    state_legislature[row[4]] ||= []
    state_legislature[row[4]] << row[0]
  end

  state_guber =
  state_guber.map do |party, states|
    {
      'name' => party,
      'data' => states.map { |e| { code: e[0], governor: e[1] } }
    }
  end.to_json

  state_legislature =
  state_legislature.map do |party, states|
    { 'name' => party, 'data' => states.map { |e| { code: e } } }
  end.to_json

  get '/' do
    slim :index, locals: {
      ng_all: ng_all, state_guber: state_guber,
      state_legislature: state_legislature
    }
  end
end

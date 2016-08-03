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
  # ng_all_districts = File.open('./data/maps/ng-all-districts.geojson')
  ng_all_districts = File.open('./data/maps/nigeria_senatorial_districts.json')
  ng_all_districts = JSON.load ng_all_districts
  ng_all_districts = ng_all_districts.to_json

  state_guber = {}
  state_legislature = {}
  federal_senators = {}
  # federal_senators_gender = {}

  CSV.foreach('./data/csv/list_of_senators.csv').each_with_index do |row, index|
    next if index == 0
    district_data = [row[1], row[2], row[3]]
    district_data =
    district_data.map { |e| e.split.map(&:capitalize).join(' ') }
    district_data =
    district_data.map do |e|
      e = e.split('')
      upcase = e.find_index('-')
      unless upcase.nil?
        upcase += 1
        e[upcase] = e[upcase].capitalize
      end
      e.join
    end
    federal_senators[row[4]] ||= []
    federal_senators[row[4]] << district_data
  end

  SPECIAL_STATES = {
    'Katsina' => 'KT', 'Kano' => 'KN', 'Kaduna' => 'KD',
    'Federal' => 'FCT', 'Bayelsa' => 'BY'
  }

  federal_senators =
  federal_senators.map do |party, districts|
    {
      'name' => party,
      'data' => districts.map do |e|
        e[0] = 'Federal Capital Territory' if e[0].include? 'Fct'
        code = e[0].split(' ').each_with_index.map do |t, i|
          if i == 0
            if SPECIAL_STATES.keys.include? t then SPECIAL_STATES[t] + '-'
            else "#{t[0..1].upcase}-"
            end
          else t[0]
          end
        end.join
        { district: e[0], senator: e[1], gender: e[2],
          district_code: code }
      end
    }
  end.to_json

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

  # ap state_guber
  # ap JSON.parse federal_senators

  get '/' do
    slim :index, locals: {
      ng_all: ng_all, state_guber: state_guber,
      state_legislature: state_legislature, federal_senators: federal_senators,
      ng_all_districts: ng_all_districts
    }
  end

  get '/keybase.txt' do
    File.read(File.join('public', 'keybase.txt'))
  end
end
